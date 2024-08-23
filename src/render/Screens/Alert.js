import { Screen } from "./Screen.js"

export class Alert extends Screen {
    constructor({ title, text, center = true, animation = true }) {
        super()
        this.options = { title, text, center, animation }
        this.reset()
    }

    close() {
        super.close()
        this.afterScreen.show()
    }

    show(afterScreen) {
        this.afterScreen = afterScreen
        super.show()
    }

    buildFunction() {
        const alert_screen = document.createElement("div")
        alert_screen.className = "screen-wrapper"

        const { text, animation, center, title } = this.options

        alert_screen.innerHTML = `
        <fieldset id="alert" class="${animation ? "down" : ""}"
        style="align-self:${center ? "center;" : "flex-start;margin-top: 5px;"}">
            <legend>${title}</legend>
            <div class="text"> ${text}</div>
            <button id="remove-alert" class="focus">
                OK
            </button>
        </fieldset>`

        $("#remove-alert", alert_screen).onclick = () => this.close()

        return alert_screen
    }
}
