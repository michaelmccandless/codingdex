export async function loadJSON(path) {
    try {
        const response = await fetch(path)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error loading JSON:", error)
        return null
    }
}

export function loadData() {
    let data = JSON.parse(localStorage.getItem("progress"))
    if (!data) {
        data = {
            "completedLessons": [],
            "autosaves": {},
        }
    }

    return data
}

export function saveData(data) {
    localStorage.setItem("progress", JSON.stringify(data));
}