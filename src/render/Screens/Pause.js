import navigation from "./navigation.js"
import { game } from "../Game.js"
import { Screen } from "./Screen.js"
import { screens } from "../ScreenManager.js"

const get = id => document.getElementById(id)
const tela = get('tela')

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
                    <button id="continue" class="focus">CONTINUE</button>
                    <button id="config">OPÇÕES</button>
                    <button id="new-game">NEW GAME</button>
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

            const buttons = pause_screen.querySelectorAll("button")
            buttons.forEach( button => {
                button.onclick = () => {
                    buttonsFunctions[button.id]()
                }
            })

            return pause_screen
        }

        this.reset()
    }
}