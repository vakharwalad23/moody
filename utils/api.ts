const urlCreator = (path: string): string => {
    return window.location.origin + path
}

export const createNewEntry = async () => {
    const res = await fetch(new Request(urlCreator("/api/journal"), {
        method: "POST",
        body: JSON.stringify({}),
    }))

    if (!res.ok) {
        throw new Error("Failed to create new entry")
    }
    const data = await res.json()
    return data.data
}

export const updateEntry = async (id: string, content: string) => {
    const res = await fetch(new Request(urlCreator(`/api/journal/${id}`), {
        method: "PATCH",
        body: JSON.stringify({ content }),
    }))

    if (!res.ok) {
        throw new Error("Failed to update entry")
    }
    const data = await res.json()
    return data.data
}

export const askQuestion = async (question: string) => {
    const res = await fetch(new Request(urlCreator("/api/question"), {
        method: "POST",
        body: JSON.stringify({
            question
        }),
    }))

    if (!res.ok) {
        throw new Error("Failed to ask question")
    }
    const data = await res.json()
    return data.data
}