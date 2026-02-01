// Imports
import * as main from "./main.js"

// Load JSON Data
let lessonsJSON = await main.loadJSON("./json/lessons.json")

// Functions
function loadLearnPage() {
    // Get Localstorage Data
    let data = main.loadData()
}

// On Load
loadLearnPage()