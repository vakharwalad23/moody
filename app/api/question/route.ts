import { QA } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
    const { question }: { question: string } = await request.json()
    const user = await getUserByClerkId()

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