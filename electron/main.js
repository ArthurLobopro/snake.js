const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

require('./header/header-actions-main.js')

function createWindow () {
    const win = new BrowserWindow({
        width: 865,
        height: 625,
        minWidth: 865,
        minHeight: 625,
        resizable: false,
        frame: false,
        icon: path.join( __dirname, "../assets/icon32.png"),
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.setMenuBarVisibility(null)
    win.loadFile('index.html')
}

const isUnicWindow = app.requestSingleInstanceLock() //Verifica se o app já foi iniciado

if (!isUnicWindow) {
    app.quit() // Caso o app já tiver sido aberto ele é fechado
}else{
    app.whenReady().then(createWindow)
}

app.on('second-instance', () => {
    const win = BrowserWindow.getAllWindows()[0]
    if(win.isMinimized()) win.restore()
    win.center()
    win.focus()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
// Faz com que o programa não inicie várias vezes durante a instalação
if (require('electron-squirrel-startup')){
    return app.quit();
}

const Store = require('electron-store')
const storeOptions = {
    cwd: "GameData/"
}

ipcMain.on('getData',(event, argKey) => {
    const storage = new Store(storeOptions)
    event.returnValue = storage.get(argKey)
})

ipcMain.on('saveData', (event, arg) => {
    const storage = new Store(storeOptions)
    const { key, value } = arg
    storage.set(key, value)
    event.returnValue = 200
})