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
            mood: analysis?.mood ?? '',
            summary: analysis?.summary ?? '',
            subject: analysis?.subject ?? '',
            negative: analysis?.negative ?? false,
            color: analysis?.color ?? '',
        },
        update: {
            ...analysis
        }
    })

    return NextResponse.json({ data: { ...updatedEntry, Analysis:updatedAnalysis } })
}