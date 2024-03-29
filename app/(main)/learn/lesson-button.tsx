"use client"

import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
    id: number;
    index: number;
    totalCount: number;
    locked?: boolean;
    current?: boolean;
    percentage: number;
}

const LessonButton = ({ id, index, totalCount, locked, current, percentage }: Props) => {
    const cycleLentgh = 8;
    const cycleIndex = index % cycleLentgh;
    let identationLevel;

    if (cycleIndex <= 2) {
        identationLevel = cycleIndex;
    } else if (cycleIndex <= 4) {
        identationLevel = 4 - cycleIndex;
    } else if (cycleIndex <= 6) {
        identationLevel = 4 - cycleIndex;
    } else {
        identationLevel = cycleIndex - 8;
    }

    const rightPostion = identationLevel * 40;
    const isFirst = index === 0;
    const isLast = index === totalCount;
    const isCompleted = !current && !locked;

    const Icon = isCompleted ? Check : isLast ? Crown : Star;
    const href = isCompleted ? `/lesson/${id}` : '/lesson';

    console.log({
        index,
        isCompleted,
        current,
        locked,
        percentage
    })
    return (
        <Link
            href={href}
            // aria-disabled={locked}
            style={{ pointerEvents: locked ? "none" : "auto" }}>
            <div
                className="relative"
                style={{
                    right: `${rightPostion}px`,
                    marginTop: isFirst && !isCompleted ? 60 : 24,
                }}
            >
                {current ? (
                    <div className="-[102px] w-[102px] relative" >
                        <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
                            start
                            <div
                                className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2 "
                            />
                        </div>

                        <CircularProgressbarWithChildren
                            value={(Number.isNaN(percentage) ? 0 : percentage)}
                            styles={{
                                path: {
                                    stroke: "#4ade80"
                                },
                                trail: {
                                    stroke: "#e5e7eb"
                                }
                            }}
                        >
                            <Button
                                size="rounded"
                                variant={locked ? "locked" : "secondary"}
                                className="h-[70px] w-[70px] border-b-8"
                            >
                                <Icon
                                    className={
                                        cn('h-10 w-10',
                                            locked ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400' : 'fill-primary-foreground text-primary-foreground',
                                            isCompleted && "fill-none stroke-[4]"
                                        )
                                    }
                                />
                            </Button>
                        </CircularProgressbarWithChildren>
                    </div>
                ) : <div>
                    <Button
                        size="rounded"
                        variant={locked ? "locked" : "secondary"}
                        className="h-[70px] w-[70px] border-b-8"
                        onClick={() => console.log(index)}
                    >
                        <Icon
                            className={
                                cn('h-10 w-10',
                                    locked ? 'fill-neutral-400 text-neutral-400 stroke-neutral-400' : 'fill-primary-foreground text-primary-foreground',
                                    isCompleted && "fill-none stroke-[4]"
                                )
                            }
                        />
                    </Button>
                </div>}
            </div>
        </Link >
    )
}

export default LessonButton