import navigation from "./navigation.js"
import { game } from "../Game.js"
import { Screen } from "./Screen.js"
import { screens } from "../ScreenManager.js"
export default class PauseScreen extends Screen {
    constructor() {
        super()

        this.buildFunction = () => {
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

            const buttonsFunctions = {}

            buttonsFunctions.continue = () => {
                this.close()
                setTimeout(() => game.play(), 150)
            }

            buttonsFunctions['new-game'] = () => {
                this.close()
                setTimeout(() => game.newGame(), 150)
            }

            buttonsFunctions.config = () => {
                screens.config.show(this)
                this.hide()
            }

            buttonsFunctions.init = () => {
                this.close()
                game.status = "inative"
                screens.init.show()
            }

            const buttons = pause_screen.querySelectorAll("button")
            buttons.forEach( button => {
                button.onclick = () => {
                    buttonsFunctions[button.dataset.action]()
                }
            })

            return pause_screen
        }

        this.reset()
    }
}