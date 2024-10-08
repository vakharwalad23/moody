import { revalidate } from "@/utils/actions"
import { analyze } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { User } from "@/utils/definitions"

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const { content } = await request.json()
    const user = await getUserByClerkId() as User;
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

    revalidate(['/journal'])

    return NextResponse.json({ data: { ...updatedEntry, Analysis:updatedAnalysis } })
}