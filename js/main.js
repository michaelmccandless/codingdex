// main.js

// Header & Footer loading
let headerElement = document.getElementById("header")
let footerElement = document.getElementById("footer")
headerElement.innerHTML = await loadHTML("templates/header.html")
footerElement.innerHTML = await loadHTML("templates/footer.html")

// Theme Toggle & Applying
let data = loadData()
let documentTheme = "dark"
if (data && data.theme) {
    documentTheme = data.theme
}

let themeButton = document.getElementById("theme-toggle")
themeButton.addEventListener("click", toggleTheme)
document.documentElement.setAttribute("data-theme", documentTheme)

// Content Animations
document.body.classList.add("visible")

let links = document.querySelectorAll("a")
for (let i = 0; i < links.length; i++) {
    let link = links[i]
    let url = link.href

    link.addEventListener("click", function(event) {
        // Prevent default navigation
        event.preventDefault()

        // Animation
        document.body.classList.remove("visible")
        setTimeout(function() {
            window.location.href = url
        }, 300)
    })
}


// private Utilities
function toggleTheme() {
    let currentTheme = document.documentElement.getAttribute("data-theme")
    let newTheme = (currentTheme == "light") ? "dark" : "light"
    document.documentElement.setAttribute("data-theme", newTheme)

    let data = loadData()
    data.theme = newTheme
    saveData(data)
}

// public Utilities
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

export async function loadHTML(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const html = await response.text()
        return html
    } catch (error) {
        console.error(`Error loading ${url}:`, error)
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
            "theme": "dark",
        }
    }

    return data
}

export function saveData(data) {
    localStorage.setItem("savedData", JSON.stringify(data));
}