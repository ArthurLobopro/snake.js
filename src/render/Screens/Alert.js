import { Screen } from "./Screen.js"

export default class Alert extends Screen {
    constructor({ title, text, center = true, animation = true }) {
        super()

        this.buildFunction = () => {
            const alert_screen = document.createElement('div')
            alert_screen.className = "screen-wrapper"

            alert_screen.innerHTML = `
            <fieldset id="alert" class="${animation ? "down" : ""}"
            style="align-self:${center ? "center;" : "flex-start;margin-top: 5px;"}">
                <legend>${title}</legend>
                <div class="text"> ${text}</div>
                <button id="remove-alert">
                    OK
                </button>
            </fieldset>`
            
            alert_screen.querySelector("#remove-alert").onclick = () => this.close()
            
            return alert_screen
        }

        this.reset()
    }

    close() {
        super.close()
        this.afterScreen.show()
    }

    show(afterScreen) {
        this.afterScreen = afterScreen
        super.show(false)
    }
}
