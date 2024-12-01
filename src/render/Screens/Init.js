import { game } from "../Global.js"
import { screens } from "../ScreenManager.js"
import { Screen } from "./Screen.js"

export class InitScreen extends Screen {
    constructor() {
        super()
        this.reset()
    }

    buildFunction() {
        const init_screen = document.createElement("div")
        init_screen.className = "screen-wrapper"

        init_screen.innerHTML = `
        <fieldset id="init">
            <legend>Início</legend>
            <div class="button-wrapper">
                <button data-action="start" class="focus">START</button>
                <button data-action="config">CONFIGURAÇÕES</button>
                <button data-action="controls">CONTROLES</button>
                <button data-action="exit">SAIR</button>
            </div>
        </fieldset>`

        const functions = {
            start() {
                this.close()
                screens.gameScreen.show()
                game.newGame()
            },
            config() {
                screens.config.show(this)
            },
            controls() {
                screens.controls.show(this)
            },
            exit() {
                ipcRenderer.send("close")
            },
        }

        const buttons = init_screen.querySelectorAll("button")

        buttons.forEach((button) => {
            button.onclick = () => {
                functions?.[button.dataset.action]?.call(this)
            }
        })

        return init_screen
    }
}
