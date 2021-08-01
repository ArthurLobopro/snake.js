const { contextBridge, ipcRenderer } = require('electron')
const Store = require('electron-store')

const getData = key => ipcRenderer.sendSync('getData', key)

const saveData = (key, value, reload = false) => {
    const status = ipcRenderer.sendSync('saveData', { key, value })
    if(status === 200 && reload){
        window.location.reload()
    }
}

contextBridge.exposeInMainWorld( 'gameApi' , { getData, saveData })

window.addEventListener('DOMContentLoaded', () => {

    require("./header/header-actions-renderer.js")

})