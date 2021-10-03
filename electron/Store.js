const Store = require('electron-store')
const { ipcMain } = require("electron")
const { colorsSchema, preferencesSchema, dataSchema } = require("./Schemas")

const storeFolderName = "data"

const colors = new Store({
    cwd: storeFolderName,
    name: "colors",
    schema: colorsSchema
})

const preferences = new Store({
    cwd: storeFolderName,
    name: "preferences",
    schema: preferencesSchema
})

const data = new Store({
    cwd: storeFolderName,
    name: "data",
    schema: dataSchema
})

ipcMain.on('getColors', (event) => {
    event.returnValue = colors.store
})

ipcMain.on('saveColors', (event, argColors) => {
    colors.set(argColors)
})

ipcMain.on('getPreferences', event => {
    event.returnValue = preferences.store
})

ipcMain.on('savePreferences', (event, argPreferences) => {
    preferences.set(argPreferences)
})

ipcMain.on('getData', event => event.returnValue = data.store)

ipcMain.on('saveData', (event, argData) => {
    data.set(argData)
})