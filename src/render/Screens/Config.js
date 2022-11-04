import { game } from "../Game.js"
import { Screen } from "./Screen.js"
import { screens } from "../ScreenManager.js"
export default class ConfigScreen extends Screen {
    constructor() {
        super()
        this.reset()
    }

    close() {
        super.close()
        this.afterScreen?.show()
    }

    show(afterScreen) {
        this.afterScreen = afterScreen
        super.show()
    }

    buildFunction() {
        const config_screen = document.createElement('div')
        config_screen.className = "screen-wrapper"
        config_screen.id = "config"

        config_screen.innerHTML = `
        <fieldset>
            <legend>CONFIGURAÇÕES</legend>
            
            <div class="button-wrapper">
                <button data-action="velocidade" class="focus">Velocidade</button>
                <button data-action="cores">Cores</button>
                <button data-action="voltar">Voltar</button>
            </div>
        </fieldset>`

        const configs = {
            velocidade() {
                screens.config_screens.velocity.show()
            },
            cores() {
                screens.config_screens.colors.show()
            },

        }

        configs.voltar = () => this.close()

        const buttons = config_screen.querySelectorAll('button')
        buttons.forEach(button => {
            button.onclick = () => {
                configs[button.dataset.action](game)
            }
        })

        return config_screen
    }
}