const urlCreator = (path: string): string => {
    return window.location.origin + path
}

export const createNewEntry = async () => {
    const res = await fetch(urlCreator("/api/journal"), {
        method: "POST",
        body: JSON.stringify({}),
    })

    if (!res.ok) {
        throw new Error("Failed to create new entry")
    }
    const data = await res.json()
    return data.data
}