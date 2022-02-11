import { setConfig } from "../../Game.js"
import { saveVelocidade } from "../../Data.js"
import { ConfigScreenBase } from "../Screen.js"
import { game } from "../../Game.js"
import { screens } from "../../ScreenManager.js"

export default class VelocityScreen extends ConfigScreenBase {
    constructor() {
        super()

        this.buildFunction = () => {
            const { velocidade } = game
            const velocity_screen = document.createElement('div')

            velocity_screen.className = "screen-wrapper"

            velocity_screen.innerHTML = `
            <fieldset id="">
                <legend class="title">Velocidade</legend>        
                    <div class="text">
                        <div class="line">
                            <div>Lento</div>
                            <div class="check" data-check="${velocidade === 300 ? true : false}" data-value="300"></div>
                        </div>
                        <div class="line">
                            <div>Médio</div>
                            <div class="check" data-check="${velocidade === 200 ? true : false}" data-value="200"></div>
                        </div>
                        <div class="line">
                            <div>Rápido</div>
                            <div class="check" data-check="${velocidade === 100 ? true : false}" data-value="100"></div>
                        </div>
                    </div>
                    <div class="buttons">
                        <button value="1">
                            OK
                        </button>
                        <button class="cancel" value="0">
                            Cancelar
                        </button>
                    </div>
            </fieldset>`

            const checks = velocity_screen.querySelectorAll('.check')
            checks.forEach(check => {
                check.onclick = () => {
                    checks.forEach(check => {
                        check.dataset.check = "false"
                    })
                   check.dataset.check = "true"
                }
            })

            const buttons = velocity_screen.querySelectorAll('button')
            buttons.forEach(e => {
                e.onclick = event => {
                    if (event.target.value == "1") {
                        const value = Number(Array.from(checks).find(e => e.dataset.check === "true").dataset.value)
                        setConfig('velocidade', value)
                        saveVelocidade(value)
                    }
                    this.close()
                    screens.config.addNavigation()
                }
            })

            return velocity_screen
        }
    }
}