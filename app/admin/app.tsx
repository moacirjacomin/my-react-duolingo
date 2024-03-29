"use client"

import { Admin, Resource, defaultTheme, radiantLightTheme, radiantDarkTheme  } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import CourseList from './course/list';
import CourseCreate from './course/create';
import CourseEdit from './course/edit';

import UnitList from './units/list';
import UnitCreate from './units/create';
import UnitEdit from './units/edit';

import LessonList from './lessons/list';
import LessonCreate from './lessons/create';
import LessonEdit from './lessons/edit';

import ChallengeList from './challenges/list';
import ChallengeCreate from './challenges/create';
import ChallengeEdit from './challenges/edit';

import { ChallengeOptionList } from "./challengeOption/list";
import { ChallengeOptionEdit } from "./challengeOption/edit";
import { ChallengeOptionCreate } from "./challengeOption/create";

import { BookCopy, BringToFront, ClipboardSignature, Dices, GanttChartSquare } from 'lucide-react'

const dataProvider = simpleRestProvider('/api');

const myTheme = {
    ...defaultTheme,
    // palette: {
    //     mode: 'dark',
    //     primary: indigo,
    //     secondary: pink,
    //     error: red,
    // },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    components: {
        ...defaultTheme.components,
        MuiTextField: {
            defaultProps: {
                variant: 'outlined' as const,
            },
        },
        MuiFormControl: {
            defaultProps: {
                variant: 'outlined' as const,
            },
        },
    },
};

const App = () => {
    return (
        <Admin dataProvider={dataProvider} title='Lingo Admin' 
        // theme={myTheme} 
        theme={radiantLightTheme}
        darkTheme={radiantDarkTheme}
        >
            <Resource
                name='courses'
                list={CourseList}
                create={CourseCreate}
                edit={CourseEdit}
                recordRepresentation='title'
                icon={BookCopy}
            />
            <Resource
                name='units'
                list={UnitList}
                create={UnitCreate}
                edit={UnitEdit}
                recordRepresentation='title'
                icon={BringToFront}
            />
            <Resource
                name='lessons'
                list={LessonList}
                create={LessonCreate}
                edit={LessonEdit}
                recordRepresentation='title'
                icon={ClipboardSignature}
            />

            <Resource
                name="challenges"
                list={ChallengeList}
                create={ChallengeCreate}
                edit={ChallengeEdit}
                recordRepresentation="question"
                icon={Dices}
            />
            <Resource
                name="challengeOptions"
                list={ChallengeOptionList}
                create={ChallengeOptionCreate}
                edit={ChallengeOptionEdit}
                recordRepresentation="text"
                options={{ label: "Challenge Options" }}
                icon={GanttChartSquare}
            />
        </Admin>
    )
}

export default App;