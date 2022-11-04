import { saveVelocity } from "../../Data.js"
import { ConfigScreenBase } from "../Screen.js"
import { game } from "../../Game.js"
import { screens } from "../../ScreenManager.js"

export default class VelocityScreen extends ConfigScreenBase {
    constructor() {
        super()
    }

    buildFunction() {
        const { velocity } = game
        const velocity_screen = document.createElement('div')

        velocity_screen.className = "screen-wrapper"

        velocity_screen.innerHTML = `
        <fieldset id="">
            <legend class="title">Velocidade</legend>        
                <div class="text">
                    <div class="line">
                        <div>Lento</div>
                        <div class="check" data-check="${velocity === 300 ? true : false}" data-value="300"></div>
                    </div>
                    <div class="line">
                        <div>Médio</div>
                        <div class="check" data-check="${velocity === 200 ? true : false}" data-value="200"></div>
                    </div>
                    <div class="line">
                        <div>Rápido</div>
                        <div class="check" data-check="${velocity === 100 ? true : false}" data-value="100"></div>
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
        buttons.forEach(button => {
            button.onclick = event => {
                if (event.target.value == "1") {
                    const changed_velocity = Number(Array.from(checks).find(check => check.dataset.check === "true").dataset.value)
                    game.velocity = changed_velocity
                    saveVelocity(changed_velocity)
                }
                this.close()
                screens.config.addNavigation()
            }
        })

        return velocity_screen
    }
}