"use client"

import { useState, useTransition } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Confetti from 'react-confetti';
import { useAudio, useWindowSize, useMount } from "react-use";

import { reduceHearts } from "@/actions/user-progress";
import { challengeOptions, challenges, userSubscription } from "@/db/schema";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

import QuestionBubble from "./question-bubble";
import Header from "./header";
import Challenge from "./challenge";
import Footer from "./footer";
import ResultCard from "./result-card";

type Props = {
    initialLessonId: number;
    initialHearts: number;
    initialPercentage: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[]
    })[]
    userSubscription: typeof userSubscription.$inferSelect & {
        isActive: boolean;
      } | null;
}

const Quiz = ({ initialLessonId, initialLessonChallenges, initialHearts, initialPercentage, userSubscription }: Props) => {
    const { width, height } = useWindowSize();
    const [finishAudio] = useAudio({ src: '/finish.mp3', autoPlay: true })
    const [correctAudio, _c, correctControls] = useAudio({ src: '/correct.wav' })
    const [incorrectAudio, _i, incorrectControls] = useAudio({ src: '/incorrect.wav' })
    const [pending, startTransition] = useTransition()
    const [lessonId] = useState(initialLessonId)
    const [hearts, setHearts] = useState(initialHearts)
    const [percentge, setPercentage] = useState(initialPercentage)
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    })
    const router = useRouter();
    const { open: openHeartsModal } = useHeartsModal();
    const { open: openPracticeModal } = usePracticeModal();


    const [selectedOption, setSelectedOption] = useState<number>()
    const [status, setStatus] = useState<'correct' | 'wrong' | 'none'>('none')

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    useMount(() => { // popUp the practice modal
        if(initialPercentage == 100){
            openPracticeModal();
            setPercentage(0);
        }
    })

    if (!challenge) {
        return (
            <>
                {finishAudio}
                <Confetti 
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                    width={width} 
                    height={height}
                />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">

                    <Image
                        src='/finish.svg'
                        alt='Finish'
                        className="hidden lg:block"
                        height={100}
                        width={100}
                    />
                    <Image
                        src='/finish.svg'
                        alt='Finish'
                        className="block lg:hidden"
                        height={50}
                        width={50}
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        Great job! <br /> You&apos;ve completed the lesson.</h1>

                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard
                            variant='points'
                            value={challenges.length * 10}
                        />
                        <ResultCard
                            variant='hearts'
                            value={hearts}
                        />
                    </div>
                </div>
                <Footer  
                  lessonId={lessonId}
                  status="completed"
                  onCheck={() => {
                    router.push('/learn')
                  }}
                />
            </>
        )
    }

    const title = challenge.type === 'ASSIST' ? 'Select the correct meaning' : challenge.question;

    const onSelect = (id: number) => {
        if (status !== 'none') return;

        setSelectedOption(id);
    };

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    }

    const onContinue = () => {
        if (!selectedOption) return;

        if (status === 'wrong') {
            setStatus('none');
            setSelectedOption(undefined);
            return;
        }
        if (status === 'correct') {
            onNext();
            setStatus('none');
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find((option) => option.correct);

        if (!correctOption) return;

        if (correctOption.id === selectedOption) {

            startTransition(() => {
                upsertChallengeProgress(challenge.id).then((response) => {
                    if (response?.error === 'hearts') { // missing hearts 
                        openHeartsModal();
                        return;
                    }

                    correctControls.play();
                    setStatus('correct');
                    setPercentage((prev) => prev + 100 / challenges.length);

                    // check if it's a practice
                    if (initialPercentage === 100) {
                        setHearts((prev) => Math.min(prev + 1, 5))
                    }
                })
                    .catch(() => toast.error('Something wen wrong. Please try again #123'))
            })
        } else {
            startTransition(() => {
                reduceHearts(challenge.id)
                    .then((response) => {

                        if (response?.error === 'hearts') { // missing hearts
                            openHeartsModal();
                            return;
                        }

                        incorrectControls.play();
                        setStatus('wrong');

                        if (!response?.error) {
                            setHearts((prev) => Math.max(prev - 1, 0));
                        }
                    })
                    .catch(() => toast.error('Something went wrong reducing hearts'))
            });
        }
    }
    return (
        <>
            {incorrectAudio}
            {correctAudio}
            <Header
                hearts={hearts}
                percentage={percentge}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="  lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12"
                    >
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div className="">
                            {challenge.type === 'ASSIST' && (
                                <QuestionBubble question={challenge.question} />
                            )}

                            <Challenge
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disable={pending}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer
                disabled={pending || !selectedOption}
                status={status} // 'correct' | 'wrong' | 'none'
                onCheck={onContinue}
            />
        </>
    )
}

export default Quiz