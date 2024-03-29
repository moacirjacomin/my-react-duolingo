import { lessons, units } from "@/db/schema";
import UnitBanner from "./unit-banner";
import LessonButton from "./lesson-button";

type Props = {
    id: number;
    order: number;
    description: string;
    title: string;
    lessons: (typeof lessons.$inferSelect & {
        completed: boolean
    })[];
    activeLesson: typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect
    } | undefined | null;
    activeLessonPercentage: number;
}


const Unit = ({ id, order, description, title, lessons, activeLesson, activeLessonPercentage }: Props) => {
    console.log(activeLesson);
    return (
        <>
            <UnitBanner title={title} description={description} />
            <div className="flex items-center flex-col reltive">
                {lessons.map((lesson, index) => {
                    // const isCurrent = activeLesson == undefined && index == 0 ? true :  lesson.id === activeLesson?.id;
                    const isCurrent = lesson.id === activeLesson?.id;
                    const isLocked = !lesson.completed && !isCurrent;
                    // console.log(lesson)
                    return (
                        <>
                        {/* <p>{index} lesson.id={lesson.id} == {activeLesson?.id}</p> */}
                        <LessonButton
                            key={lesson.id}
                            id={lesson.id}
                            index={index}
                            totalCount={lessons.length -1}
                            locked={isLocked}
                            current={isCurrent}
                            percentage={activeLessonPercentage}
                        />
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Unit