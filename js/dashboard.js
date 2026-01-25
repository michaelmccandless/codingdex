// Imports
import * as main from "./main.js"

// Load JSON Data
let lessonsJSON = await main.loadJSON("../json/lessons.json")

// Functions
function getLessonCardHTML(title, completedLessons, totalLessons) {
    let percent = Math.round((completedLessons / totalLessons) * 100)

    let barColor
    if (percent >= 67) {
        barColor = "progress-green";
    } else if (percent >= 34) {
        barColor = "progress-yellow";
    } else {
        barColor = "progress-red";
    }

    const lessonCard = `
    <div class="frame frame-dark">
        <div class="row-left mb-2">
            <h1 class="text-small">${title}</h1>
            <div class="row-right stretch-width gap-2 text-small">
                <p class="progress-count text-clear text-small">${completedLessons}/${totalLessons} Lessons</p>
                <p class="progress-percent text-normal text-small">${percent}%</p>
            </div>
        </div>
        <div class="progress-bar progress-small">
            <div class="progress-bar-fill ${barColor}" style="--fill: ${percent}%"></div>
        </div>
    </div>
    `

    return lessonCard
}

function loadDashboard() {
    // Get Localstorage Data
    let data = main.loadData()

    let totalLessonsOverall = 0
    let totalCompletedLessons = 0

    // Lessons Cards
    for (let Topic in lessonsJSON) {
        let lessonArray = lessonsJSON[Topic]
        
        let title = Topic
        let totalLessons = lessonArray.length
        let completedLessons = 0
        
        for (let name in lessonArray) {
            let lesson = lessonArray[name]
            let identifier = lesson["ID"]
            if (data.completedLessons.includes(identifier)) {
                completedLessons += 1
            }
        }
        
        totalLessonsOverall += totalLessons
        totalCompletedLessons += completedLessons

        let lessonCardHTML = getLessonCardHTML(title, completedLessons, totalLessons)
        let lessonGrid = document.getElementById("lessons-grid")
        lessonGrid.insertAdjacentHTML("beforeend", lessonCardHTML)
    }

    // Mastery Progress
    let masteryPercent = Math.round((totalCompletedLessons / totalLessonsOverall) * 100)
    let masteryProgress = document.getElementById("mastery-progress")

    let masteryBar = masteryProgress.querySelector(".progress-bar-fill")
    let masteryPercentText = masteryProgress.querySelector(".progress-percent")
    let masteryCountText = masteryProgress.querySelector(".progress-count")

    masteryBar.style.setProperty("--fill", `${masteryPercent}%`)
    masteryPercentText.textContent = `${masteryPercent}%`
    masteryCountText.textContent = `${totalCompletedLessons}/${totalLessonsOverall} Lessons`
}

// On Load
loadDashboard()