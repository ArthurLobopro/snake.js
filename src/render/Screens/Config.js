import { game } from "../Game.js"
import { Screen } from "./Screen.js"
import { screens } from "../ScreenManager.js"
export default class ConfigScreen extends Screen {
    constructor() {
        super()

        this.buildFunction = () => {
            const config_screen = document.createElement('div')
            config_screen.className = "screen-wrapper"
            config_screen.id = "config"

            config_screen.innerHTML = `
            <fieldset>
                <legend>CONFIGURAÇÕES</legend>
                
                <div class="button-wrapper">
                    <button data-type="velocidade" class="focus">Velocidade</button>
                    <button data-type="cores">Cores</button>
                    <button data-type="voltar">Voltar</button>
                </div>
            </fieldset>`

            const configs = {
                velocidade(){
                    screens.config_screens.velocity.show()
                },
                cores() {
                    screens.config_screens.colors.show()
                },
                voltar: () => this.close()
            }

            for(const func in configs){
                configs[func] = configs[func].bind(this)
            }

            const buttons = config_screen.querySelectorAll('button')
            buttons.forEach(button => {
                button.onclick = () => {
                    configs[button.dataset.type](game)
                }
            })

            return config_screen
        }

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
}