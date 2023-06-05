import { game } from "../Global.js"
import { Screen } from "./Screen.js"
import { screens } from "../ScreenManager.js"

export class PauseScreen extends Screen {
    constructor() {
        super()
        this.reset()
    }

    buildFunction() {
        const pause_screen = document.createElement('div')
        pause_screen.className = "screen-wrapper"
        pause_screen.id = "pause-wrapper"

        pause_screen.innerHTML = `
        <fieldset id="pause">
            <legend>Pause</legend>
            <div class="button-wrapper">
                <button data-action="continue" class="focus">CONTINUE</button>
                <button data-action="config">OPÇÕES</button>
                <button data-action="new-game">NOVO JOGO</button>
                <button data-action="init">IR PARA O INICIO</button>
            </div>
        </fieldset>`

        const buttonsFunctions = {
            "continue": () => {
                this.close()
                setTimeout(() => game.play(), 150)
            },
            "new-game": () => {
                this.close()
                setTimeout(() => game.newGame(), 150)
            },
            config: () => {
                screens.config.show(this)
                this.hide()
            },
            init: () => {
                this.close()
                game.status = "inative"
                screens.init.show()
            }
        }

        const buttons = pause_screen.querySelectorAll("button")
        buttons.forEach(button => {
            button.onclick = () => {
                buttonsFunctions[button.dataset.action]?.call(this)
            }
        })

        return pause_screen
    }
}