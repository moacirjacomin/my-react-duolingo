"use client"
import Image from "next/image"
import { Button } from '@/components/ui/button';
import Link from "next/link";

const Promo = () => {
    return (
        <div className='border-2 rounded-xl p-4 space-4 mt-3'>
            <div className="space-y-2">
                <div className="flex items-center gap-x-2">
                    <Image
                        src='/unlimited.svg'
                        alt='Promo'
                        height={26}
                        width={26}
                    />
                    <h3 className='font-bold text-lg'
                    >
                        Upgrade to Pro</h3>
                </div>
                <p className="text-muted-foreground">
                    Get unlimited hearts and more!
                </p>
            </div>
            <Link href='/shop'>
                <Button
                    variant='super'
                    className="w-full mt-6"
                    size='lg'
                >
                    Upgrade today
                </Button>
            </Link>
        </div>
    )
}

export default Promo