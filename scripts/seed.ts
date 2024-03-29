import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from '../db/schema';

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log('Seeding database');

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userSubscription);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: 'Spanish',
                imageSrc: '/es.svg',
            }, {
                id: 2,
                title: 'French',
                imageSrc: '/fr.svg',
            }, {
                id: 3,
                title: 'Croatian',
                imageSrc: '/hr.svg',
            }, {
                id: 4,
                title: 'Italian',
                imageSrc: '/it.svg',
            }, {
                id: 5,
                title: 'Japanese',
                imageSrc: '/jp.svg',
            }
        ]);

        // Units
        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: 'Unit 1',
                description: 'Learn the basics of Spanish',
                order: 1
            }
        ]);

        // lessons
        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                title: 'Nouns',
                order: 1
            }, {
                id: 2,
                unitId: 1,
                title: 'Verbs',
                order: 2
            }, {
              id: 3,
              unitId: 1,
              title: 'Verbs',
              order: 3
          }, {
            id: 4,
            unitId: 1,
            title: 'Verbs',
            order: 4
        }
        ]);

        // challenges
        await db.insert(schema.challenges).values([
            {
              id: 1,
              lessonId: 1, // Nouns
              type: "SELECT",
              order: 1,
              question: 'Which one of these is the "the man"?',
            },
            {
              id: 2,
              lessonId: 1, // Nouns
              type: "ASSIST",
              order: 2,
              question: '"the man"',
            },
            {
              id: 3,
              lessonId: 1, // Nouns
              type: "SELECT",
              order: 3,
              question: 'Which one of these is the "the robot"?',
            },
          ]);
      
          await db.insert(schema.challengeOptions).values([
            {
              challengeId: 1, // Which one of these is "the man"?
              imageSrc: "/man.svg",
              correct: true,
              text: "el hombre",
              audioSrc: "/es_man.mp3",
            },
            {
              challengeId: 1,
              imageSrc: "/woman.svg",
              correct: false,
              text: "la mujer",
              audioSrc: "/es_woman.mp3",
            },
            {
              challengeId: 1,
              imageSrc: "/robot.svg",
              correct: false,
              text: "el robot",
              audioSrc: "/es_robot.mp3",
            },
          ]);
      
          await db.insert(schema.challengeOptions).values([
            {
              challengeId: 2, // "the man"?
              correct: true,
              text: "el hombre",
              audioSrc: "/es_man.mp3",
            },
            {
              challengeId: 2,
              correct: false,
              text: "la mujer",
              audioSrc: "/es_woman.mp3",
            },
            {
              challengeId: 2,
              correct: false,
              text: "el robot",
              audioSrc: "/es_robot.mp3",
            },
          ]);
      
          await db.insert(schema.challengeOptions).values([
            {
              challengeId: 3, // Which one of these is the "the robot"?
              imageSrc: "/man.svg",
              correct: false,
              text: "el hombre",
              audioSrc: "/es_man.mp3",
            },
            {
              challengeId: 3,
              imageSrc: "/woman.svg",
              correct: false,
              text: "la mujer",
              audioSrc: "/es_woman.mp3",
            },
            {
              challengeId: 3,
              imageSrc: "/robot.svg",
              correct: true,
              text: "el robot",
              audioSrc: "/es_robot.mp3",
            },
          ]);
      
          await db.insert(schema.challenges).values([
            {
              id: 4,
              lessonId: 2, // Verbs
              type: "SELECT",
              order: 1,
              question: 'Which one of these is the "the man"?',
            },
            {
              id: 5,
              lessonId: 2, // Verbs
              type: "ASSIST",
              order: 2,
              question: '"the man"',
            },
            {
              id: 6,
              lessonId: 2, // Verbs
              type: "SELECT",
              order: 3,
              question: 'Which one of these is the "the robot"?',
            },
          ]);


        // // Lesson 2
        // await db.insert(schema.challenges).values([
        //   {
        //     id: 4,
        //     lessonId: 2, // Nouns
        //     type: "SELECT",
        //     order: 1,
        //     question: 'Which one of these is the "the man"?',
        //   },
        //   {
        //     id: 5,
        //     lessonId: 2, // Nouns
        //     type: "ASSIST",
        //     order: 2,
        //     question: '"the man"',
        //   },
        //   {
        //     id: 6,
        //     lessonId: 2, // Nouns
        //     type: "SELECT",
        //     order: 3,
        //     question: 'Which one of these is the "the robot"?',
        //   },
        // ]);
    
        // await db.insert(schema.challengeOptions).values([
        //   {
        //     challengeId: 4, // Which one of these is "the man"?
        //     imageSrc: "/man.svg",
        //     correct: true,
        //     text: "el hombre",
        //     audioSrc: "/es_man.mp3",
        //   },
        //   {
        //     challengeId: 4,
        //     imageSrc: "/woman.svg",
        //     correct: false,
        //     text: "la mujer",
        //     audioSrc: "/es_woman.mp3",
        //   },
        //   {
        //     challengeId: 4,
        //     imageSrc: "/robot.svg",
        //     correct: false,
        //     text: "el robot",
        //     audioSrc: "/es_robot.mp3",
        //   },
        // ]);
    
        // await db.insert(schema.challengeOptions).values([
        //   {
        //     challengeId: 5, // "the man"?
        //     correct: true,
        //     text: "el hombre",
        //     audioSrc: "/es_man.mp3",
        //   },
        //   {
        //     challengeId: 5,
        //     correct: false,
        //     text: "la mujer",
        //     audioSrc: "/es_woman.mp3",
        //   },
        //   {
        //     challengeId: 5,
        //     correct: false,
        //     text: "el robot",
        //     audioSrc: "/es_robot.mp3",
        //   },
        // ]);
    
        // await db.insert(schema.challengeOptions).values([
        //   {
        //     challengeId: 6, // Which one of these is the "the robot"?
        //     imageSrc: "/man.svg",
        //     correct: false,
        //     text: "el hombre",
        //     audioSrc: "/es_man.mp3",
        //   },
        //   {
        //     challengeId: 6,
        //     imageSrc: "/woman.svg",
        //     correct: false,
        //     text: "la mujer",
        //     audioSrc: "/es_woman.mp3",
        //   },
        //   {
        //     challengeId: 6,
        //     imageSrc: "/robot.svg",
        //     correct: true,
        //     text: "el robot",
        //     audioSrc: "/es_robot.mp3",
        //   },
        // ]);
    
    

  
        

        console.log('Seeding finish')
    } catch (error) {
        console.error(error)
        throw new Error('error to seed the database')
    }
};

main();