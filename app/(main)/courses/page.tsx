import { getCourses, getUserProgress } from '@/db/queries'
import React from 'react'
import List from './list';

const CoursesPage = async () => {
    // const courses = await getCourses();
    // const userProgress = await getUserProgress();
    // or: 
    const coursesData = getCourses();
    const userProgressData = getUserProgress();

    const [courses, userProgress] = await Promise.all([coursesData, userProgressData])

    return (
        <div className='h-full max-w-[912px] px-3 mx-auto '>
            <h1 className='text-2xl font-bol text-neutral-700'>
                Language Courses
            </h1>
            <List
                courses={courses}
                activeCourseId={userProgress?.activeCourseId}
            />
        </div>
    )
}

export default CoursesPage