import { cache } from "react";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import {
    courses,
    userProgress,
    units,
    challengeProgress,
    lessons,
    userSubscription,
} from "./schema";

export const getUnits = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();



    if (!userId || !userProgress?.activeCourseId) {
        return [];
    }

    const data = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lesson: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    challenge: {
                        orderBy: (challenges, { asc }) => [asc(challenges.order)],
                        with: {
                            challengeProgress: {
                                where: eq(
                                    challengeProgress.userId,
                                    userId,
                                ),
                            },
                        },
                    },
                },
            },
        },
    });

    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lesson.map((lesson) => {
            if (
                lesson.challenge.length === 0
            ) {
                return { ...lesson, completed: false };
            }

            const allCompletedChallenges = lesson.challenge.every((challenge) => {
                return challenge.challengeProgress
                    && challenge.challengeProgress.length > 0
                    && challenge.challengeProgress.every((progress) => progress.completed);
            });

            return { ...lesson, completed: allCompletedChallenges };
        });

        return { ...unit, lessons: lessonsWithCompletedStatus };
    });

    return normalizedData;
});


export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();

    return data;
});

export const getUserProgress = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });

    return data;
});

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        with: {
            units: {
                orderBy: (units, {asc}) => [asc(units.order)],
                with: {
                    lesson: {
                        orderBy: (lesson, { asc }) => [asc(lessons.order)]
                    }
                }
            }
        }
    });

    return data;
});

export const getCourseProgress = cache(async () => {
    const userProgress = await getUserProgress();
    const { userId } = auth();

    if (!userProgress?.activeCourseId || !userId) return null;

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lesson: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    unit: true,
                    challenge: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId),
                            }
                        }
                    }
                }
            }
        }
    });

    const firstUncompletedLesson = unitsInActiveCourse.flatMap((unit) => unit.lesson).find((lesson) => {
        return lesson.challenge.some((challenge) => {
            return !challenge.challengeProgress || challenge.challengeProgress.length === 0;
            //  && challenge.challengeProgress.some((progress) => progress.completed === false);
        })
    });

    console.log('firstUncompletedLesson')
    console.log(firstUncompletedLesson)

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id
    };
});

export const getLesson = cache(async (id?: number) => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const courseProgress = await getCourseProgress();

    const lessonId = id || courseProgress?.activeLessonId;

    if (!lessonId) {
        return null;
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenge: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId),
                    },
                },
            },
        },
    });

    if (!data || !data.challenge) {
        return null;
    }

    const normalizedChallenges = data.challenge.map((challenge) => {
        const completed = challenge.challengeProgress
            && challenge.challengeProgress.length > 0
        // && challenge.challengeProgress.every((progress) => progress.completed)

        return { ...challenge, completed };
    });

    return { ...data, challenges: normalizedChallenges }
});



export const gtLessonPercentage = cache(async (id?: number) => {
    const courseProgress = await getCourseProgress();
    const { userId } = auth();

    if (!courseProgress?.activeLessonId || !userId) return 0;

    const lesson = await getLesson(courseProgress.activeLessonId)

    if (!lesson) return 0;

    const completedChallenges = lesson.challenges.filter((chal) => chal.completed);

    return Math.round((completedChallenges.length / lesson.challenges.length) * 190);
});


export const getUserSubscription = cache(async () => {
    const { userId } = auth();
    const DAYS_IN_MS = 86_400_000;

    if (!userId) return null;

    const data = await db.query.userSubscription.findFirst({
        where: eq(userSubscription.userId, userId),
    });

    if (!data) return null;

    const isActive = data.stripePriceId && data.stripeCurrentPeriodEnd.getTime()! + DAYS_IN_MS > Date.now();

    return {
        ...data,
        isActive: !!isActive
    }
});


export const getTopTenUsers = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return [];
    }

    const data = await db.query.userProgress.findMany({
        orderBy: (userProgress, {desc}) => [desc(userProgress.points)],
        limit: 10,
        columns: {
            userId: true,
            userName: true,
            userImageSrc: true,
            points: true,
        },

    });

    return data;
});