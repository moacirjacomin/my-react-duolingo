"use client"

import { toast } from "sonner";
import Image from "next/image";
import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { createStripeUrl } from "@/actions/user-subscription";
import { POINTS_TO_REFILL } from "@/constants/general";

type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
}

 

const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
    const [pending, startTransition] = useTransition();



    const onRefilHearts = () => {
        if (pending || hearts === 6 || points < POINTS_TO_REFILL) return;

        startTransition(() => {
            refillHearts()
                .catch(() => toast.error('Something went wrong!'))
        })
    }

    const onUpgrade = () => {
        if (pending) return;

        startTransition(() => { 
            createStripeUrl()
            .then((response) => {
                if(response.data){
                    window.location.href = response.data;
                }
            })
            .catch(() => toast.error('Something went wrong with Stripe'))
        })
    }

    return (
        <ul className='w-full'>
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image
                    alt='Heart'
                    src='/heart.svg'
                    height={60}
                    width={60}
                />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Refill hearts
                    </p>
                </div>
                <Button
                    disabled={hearts === 6 || points < POINTS_TO_REFILL || pending}
                    onClick={onRefilHearts}
                >
                    {hearts === 6
                        ? 'full'
                        : (
                            <div className="flex items-center">
                                <Image
                                    src='/points.svg'
                                    alt='Points'
                                    height={20}
                                    width={20}
                                />
                                <p>
                                    {POINTS_TO_REFILL}
                                </p>
                            </div>
                        )
                    }
                </Button>
            </div>

            <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
                <Image
                    src='/unlimited.svg'
                    alt='Subscription'
                    height={60}
                    width={60}
                />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Unlimeted Hearts
                    </p>
                </div>
                <Button
                    disabled={pending}
                    onClick={onUpgrade}
                >
                    {hasActiveSubscription ? 'settings' : 'upgrade'}
                
                </Button>
            </div>
        </ul>
    )
}

export default Items