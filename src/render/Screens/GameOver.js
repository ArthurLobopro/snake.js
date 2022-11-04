import { game, canvas } from "../Game.js"
import { Screen } from "./Screen.js"

const tela = document.getElementById('tela')

export class GameOverScreen extends Screen {
    constructor() {
        super()
    }

    show() {
        this.reset()
        super.show()
    }

    buildFunction() {
        const game_over_screen = document.createElement('div')
        game_over_screen.className = "screen-wrapper"

        game_over_screen.innerHTML = `
        <fieldset id="game-over">
            <legend>GAME OVER</legend>

            <div class="table">
                <div class="line">
                    <div>Pontuação:</div>
                    <div>${game.points}</div>
                </div>
                <div class="line">
                    <div>Recorde:</div>
                    <div>${game.recorde}</div>
                </div>
            </div>

            <img src="${canvas.toDataURL('image/png')}" id="game-over-print">

            <button class="focus">NOVO JOGO</button>
        </fieldset>`

        const button = game_over_screen.getElementsByTagName('button')[0]

        button.onclick = () => {
            this.close()
            game.newGame()
        }

        return game_over_screen
    }
}