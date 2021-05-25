const { ipcRenderer } = require('electron')
const make_header = require("./make-header.js")
const path = require('path')

function init(){
    const get = id => document.getElementById(id)
    const css = document.createElement('link')
    css.rel = "stylesheet"
    css.href = path.join(__dirname , "header.css")
    document.head.appendChild(css)

    document.body.style.paddingTop = "30px"

    const header = make_header()
    document.body.appendChild(header)

    const windowNameLabel = get("window-name")
    windowNameLabel.innerText = document.querySelector('title').innerText

    const links = document.querySelectorAll("link")
    for(let e of links){
        if(e.rel.search("icon") !== -1){
            const windowIcon = document.getElementById("window-icon")
            let image = new Image()
            image.src = e.href
            image.onload = () => {
                windowIcon.appendChild(image)
            }
        }
    }

    const minimize_btn = get("minimize")
    minimize_btn.onclick = ()=> ipcRenderer.send('minimize') 

    const maxime_btn = get("expand")
    maxime_btn.onclick = () => ipcRenderer.send('expand')

    const close_btn = get("close")
    close_btn.onclick = () => ipcRenderer.send('close')
}

module.exports = init()