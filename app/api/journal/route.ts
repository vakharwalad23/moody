import { analyze } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidate } from "@/utils/actions"
import { NextResponse } from "next/server"
import { User } from "@/utils/definitions"

export const POST = async () => {
    const user = await getUserByClerkId() as User;
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: 'Write about your day here!',
            Analysis: {
                create: {
                    userId: user.id,
                    mood: 'neutral',
                    summary: 'No summary yet',
                    subject: 'No subject yet',
                    negative: false,
                    color: '#0101fe',
                }
            }
        },
    })

    revalidate(['/journal'])

    return NextResponse.json({ data: entry })
}