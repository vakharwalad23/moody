import { analyze } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const { content } = await request.json()
    const user = await getUserByClerkId()
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            },
        },
        data: {
            content,
        },
    })
    const analysis = await analyze(updatedEntry.content)
    const updatedAnalysis = await prisma.analysis.upsert({
        where: {
            entryId: updatedEntry.id,
        },
        create: {
            entryId: updatedEntry.id,
            userId: user.id,
            mood: 'neutral',
            summary: 'No summary yet',
            subject: 'No subject yet',
            negative: false,
            color: '#0101fe',
        },
        update: {
            ...analysis
        }
    })

    return NextResponse.json({ data: { ...updatedEntry, Analysis:updatedAnalysis } })
}