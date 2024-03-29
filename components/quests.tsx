
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { QUESTS } from '@/constants/general';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

type Props = {
    points: number;
}
const Quests = ({ points }: Props) => {
    return (
        <div className='border-2 rounded-xl p-4 space-y-4'>

            <div className="flex items-center w-full justify-between space-y-2">

                <h3 className='font-bold text-lg' >
                    Quests
                </h3>
                <Link href='/quests'>
                    <Button
                        variant='primaryOutline' 
                        size='lg'
                    >
                        View all
                    </Button>
                </Link>
            </div>

            <ul className='w-full space-y-3'>
                {QUESTS.map((quest) => {
                    const progress = (points / quest.value) * 100;

                    return (
                        <div
                            key={quest.title}
                            className='flex items-center w-full p-2 gap-x-3 border-t-2 border-gray-100'
                        >
                            <Image
                                src='/points.svg'
                                alt='Points'
                                height={50}
                                width={50}
                            />
                            <div className="flex flex-col gap-y-2 w-full">
                                <p className="text-neutral-700 text-sm font-bold">
                                    {quest.title}
                                </p>
                                <Progress
                                    value={progress}
                                    className="h-3"
                                />
                            </div>
                        </div>
                    )
                })}
            </ul>

        </div>
    )
}

export default Quests