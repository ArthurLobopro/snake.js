import { Screen } from "./Screen.js";
import { screens } from "../ScreenManager.js";
import { game } from "../Game.js";

export default class InitScreen extends Screen {
    constructor(){
        super()

        this.buildFunction = () => {
            const init_screen = document.createElement('div')
            init_screen.className = "screen-wrapper"
            
            init_screen.innerHTML = `
            <fieldset id="init">
                <legend>Início</legend>
                <div class="button-wrapper">
                    <button data-action="start" class="focus">START</button>
                    <button data-action="config">CONFIGURAÇÕES</button>
                    <button data-action="exit">SAIR</button>
                </div>
            </fieldset>`

            const functions = {
                start() {
                    this.close()
                    game.newGame()
                },
                config() {
                    screens.config.show(this)
                },
                exit() {
                    ipcRenderer.send('close')
                }
            }

            const buttons = init_screen.querySelectorAll('button')
            
            buttons.forEach(button => {
                button.onclick = () => {
                    functions?.[button.dataset.action]?.call(this)
                }
            })

            return init_screen
        }

        this.reset()
    }
}