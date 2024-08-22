export type QuestionEntry = {
    id: string;
    content: string;
    createdAt: Date;
}

export type HistoryChartAnalysis = {
    analysis: {
        id: string;
        entryId: string;
        userId: string;
        mood: string;
        summary: string;
        subject: string;
        color: string;
        negative: boolean;
        sentimentScore: number;
        createdAt: Date;
        updatedAt: Date;
    }[];
    average: number;
}

export type User = {
    id: string;
    clerkId: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}