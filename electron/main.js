const { app, BrowserWindow} = require('electron')
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