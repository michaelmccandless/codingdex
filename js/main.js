// main.js
function toggleTheme() {
    let currentTheme = document.documentElement.getAttribute("data-theme")
    let newTheme = (currentTheme == "light") ? "dark" : "light"
    document.documentElement.setAttribute("data-theme", newTheme)

    let data = loadData()
    data.theme = newTheme
    saveData(data)
}

function initializePage() {
    // Initial Variables
    let data = loadData()
    let documentTheme = "dark"
    if (data && data.theme) {
        documentTheme = data.theme
    }

    // Theme Toggle & Applying
    let themeButton = document.getElementById("theme-toggle")
    themeButton.addEventListener("click", toggleTheme)
    document.documentElement.setAttribute("data-theme", documentTheme)
}
initializePage()

// Exports
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
    let data = JSON.parse(localStorage.getItem("savedData"))
    if (!data) {
        data = {
            "completedLessons": [],
            "autosaves": {},
            "settings": {},
            "theme": "light",
        }
    }

    return data
}

export function saveData(data) {
    localStorage.setItem("savedData", JSON.stringify(data));
}