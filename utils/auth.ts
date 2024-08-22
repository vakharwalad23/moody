import { auth } from "@clerk/nextjs/server"
import { prisma } from "./db"
import { Prisma } from "@prisma/client"
import { DefaultArgs } from "@prisma/client/runtime/library"


export const getUserByClerkId = async () => {
    const { userId } = auth()

    const user = await prisma.user.findUnique({
        where: {
            clerkId: userId as string,
        },
    })

    return user
}