const { contextBridge, ipcRenderer } = require("electron")
const { colors, data, preferences } = require("../Store/Store")

const gameApi = {
    getColors: () => {
        return colors.store.colors
    },
    saveColors: (newColors) => colors.set("colors", newColors),
    getDefaultColors: () => colors.store.default,

    getData: () => data.store,
    saveData: (newData) => {
        data.store = newData
    },

    savePreferences: (newPreferences) => {
        preferences.store = newPreferences
    },
    getPreferences: () => preferences.store,
}

const getArg = (argName) => {
    const argValue = process.argv
        .find((arg) => arg.split("=")[0] === argName)
        .split("=")[1]
    return argValue
}

contextBridge.exposeInMainWorld("appPath", getArg("--app-path"))
contextBridge.exposeInMainWorld("gameApi", gameApi)
contextBridge.exposeInMainWorld("require", require)
contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer)

window.addEventListener("DOMContentLoaded", () => {
    const gameScript = document.createElement("script")
    gameScript.src = "../src/render/Controller.js"
    gameScript.type = "module"
    document.head.appendChild(gameScript)

    const NunitoFont = require("@electron-fonts/nunito")
    const PressStart2PFont = require("@electron-fonts/press-start-2p")
    const { ElectronFrame } = require("electron-frame/renderer")

    NunitoFont.inject()
    PressStart2PFont.inject()

    const frame = new ElectronFrame({
        colors: {
            background: "#000000",
        },
        autoInsert: true,
    })
})
