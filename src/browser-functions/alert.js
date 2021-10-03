import functions from "../telas/navegacao.js"
import { mainKeyDown } from "../Controller.js"
const target = document.getElementById("container")

function alert({title, text, center = true, animation = true}) {
    title = title ?? window.location.hostname + " diz"
    const div = document.createElement('div')
    div.classList.add("full")
    div.id = "alert"
    div.innerHTML = `
    <fieldset id="alert-interior" class="${animation ? "down" : ""}"
    style="align-self:${center ? "center": "flex-start;margin-top: 5px"}">
        <legend>${title}</legend>
        <div class="text"> ${text}</div>
        <button id="remove-alert" class="focus">
            OK
        </button>
    </fieldset>
    `
    target.appendChild(div)
    document.getElementById("remove-alert").onclick = removeAlert
    const fieldset = div.querySelector('fieldset')
    window.onkeydown = event => functions[event.key]?.(fieldset)
}

function removeAlert() {
    const div = document.querySelector("#alert.full")
    target.removeChild(div)
    window.onkeydown = mainKeyDown
}

export default alert