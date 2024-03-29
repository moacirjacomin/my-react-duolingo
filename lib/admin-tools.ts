import { auth } from '@clerk/nextjs'

const allowedIds = [
    'user_2do' // your user ID from Clerk here
]

export const isAdmin =  () => {
    const { userId } =  auth();

    if(!userId) return false;

    return allowedIds.includes(userId as string);
}