import functions from "./navegacao.js"
import config from "./Config.js"
import { game, newGame } from "../Game.js"

const get = id => document.getElementById(id)
const tela = get('tela')

export default async function viewPause() {
    const pause_wrapper = document.createElement('div')


    pause_wrapper.id = "pause-wrapper"

    pause_wrapper.innerHTML = `
    <fieldset id="pause">
        <legend>Pause</legend>
        <div class="button-wrapper">
            <button id="continue" class="focus">CONTINUE</button>
            <button id="config">OPÇÕES</button>
            <button id="new-game">NEW GAME</button>
        </div>
    </fieldset>`

    tela.appendChild(pause_wrapper)
    get('continue').onclick = () => {
        tela.removeChild(pause_wrapper)
        setTimeout(() => game.play(), 150)
    }
    get('new-game').onclick = () => {
        tela.removeChild(pause_wrapper)
        setTimeout(newGame, 150)
    }
    get('config').onclick = async () => {
        await config()
        window.onkeydown = event => functions[event.key]?.(pause_wrapper)
    }
    window.onkeydown = event => functions[event.key]?.(pause_wrapper)
}