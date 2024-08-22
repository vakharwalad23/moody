import { QA } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"
import { User } from "@/utils/definitions"

export const POST = async (request: Request) => {
    const { question }: { question: string } = await request.json()
    const user = await getUserByClerkId() as User;

    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id
        },
        select :{
            id: true,
            content: true,
            createdAt: true,
        }
    })

    const answer = await QA(question, entries)

    return NextResponse.json({ data: answer })
}