const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

require('electron-frame/main')
require('./Store')

const appPath = app.getAppPath()

function createWindow() {
    const win = new BrowserWindow({
        width: 865,
        height: 625,
        minWidth: 865,
        minHeight: 625,
        frame: false,
        show: false,
        icon: path.resolve(appPath, "assets/icon32.png"),
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.setMenuBarVisibility(null)
    win.loadFile('index.html')
    win.once('ready-to-show', () => { win.show(); win.focus() })
}

const isUnicWindow = app.requestSingleInstanceLock()

if (!isUnicWindow) {
    app.quit()
} else {
    app.whenReady().then(createWindow)
}

app.on('second-instance', () => {
    const win = BrowserWindow.getAllWindows()[0]
    if (win.isMinimized()) win.restore()
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
if (require('electron-squirrel-startup')) {
    app.quit();
}