const { contextBridge, ipcRenderer } = require('electron')
const { insertFrame } = require('electron-frame/renderer')

const gameApi = {
    getColors: () => ipcRenderer.sendSync('getColors'),
    saveColors: (colors) => ipcRenderer.send("saveColors", colors),
    getData: () => ipcRenderer.sendSync('getData'),
    saveData: (data) => ipcRenderer.send('saveData', data),
    savePreferences: (preferences) => ipcRenderer.send('savePreferences', preferences),
    getPreferences: () => ipcRenderer.sendSync('getPreferences')
}

const getArg = (argName) => {
    const argValue = process.argv.find( arg => arg.split("=")[0] == argName).split("=")[1]
    return argValue
}

contextBridge.exposeInMainWorld("appPath", getArg("--app-path"))
contextBridge.exposeInMainWorld('gameApi', gameApi)
contextBridge.exposeInMainWorld("require", require)

window.addEventListener('DOMContentLoaded', () => {

    const gameScript = document.createElement('script')
    gameScript.src = "../src/render/Controller.js"
    gameScript.type = "module"
    document.head.appendChild(gameScript)

    insertFrame()
})