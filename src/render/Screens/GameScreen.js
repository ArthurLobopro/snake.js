import { mainKeyDown } from "../Controller.js"
import { Screen } from "./Screen.js"

export class GameScreen extends Screen {
    constructor() {
        super()
        this.reset()
    }

    get components() {
        return {
            canvas: $("canvas", this.screen),
            points_div: $("#points", this.screen),
            record_div: $("#record", this.screen),
        }
    }

    show() {
        super.show()
        window.onkeydown = mainKeyDown
    }

    buildFunction() {
        const game_screen = document.createElement("div")
        game_screen.className = "screen-wrapper"

        game_screen.innerHTML = `
        <div id="game">
            <canvas id="canvas" width="315" height="315"></canvas>
                <div id="canvas-top">
                    <div class="line">
                        <div>Pontuação:</div>
                        <div id="points">0</div>
                    </div>
                    <div class="line">
                        <div>Recorde:</div>
                        <div id="record">0</div>
                    </div>
            </div>
        </div>`

        return game_screen
    }
}
