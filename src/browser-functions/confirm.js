let result
const target = document.getElementById("container")

async function  confirm({title, text, center = true}) {
    title = title ?? window.location.hostname + " diz"
    const div = document.createElement('div')
    div.classList.add("full")
    div.id = "alert"
    div.innerHTML = `
    <div id="alert-interior" style="align-self:${center ? "center": "flex-start;margin-top: 5px"}">
        <div class="title">${title}</div>
        <div class="text"> ${text}</div>
        <div class="buttons">
            <button value="1">
                OK
            </button>
            <button class="cancel" value="0">
                Cancelar
            </button>
        </div>
    </div>`

    result = null
    target.appendChild(div)
    document.querySelectorAll("#alert button").forEach( e => e.onclick = setValue)
    result = null
    return await resp()
}

async function resp() {
    return new Promise( resolve => {
        let interval = setInterval( () => {
            if(result !== null){
                clearInterval(interval)
                resolve(result)
            }
        }, 100);
    })
}

const setValue = event => {
    result = Boolean(Number(event.target.value))
    const div = document.getElementById("alert")
    target.removeChild(div)
}

if(!document.getElementById("browser-functions-style")){
    let path = window.location.pathname
    path = path.split("/")
    path.pop()
    path.shift()
    path = path.join('/') + "/src/browser-functions/style.css"
    const css = document.createElement('link')
    css.rel = "stylesheet"
    css.href = path
    css.id = "browser-functions-style"
    document.querySelector('head').appendChild(css)
}

export default confirm