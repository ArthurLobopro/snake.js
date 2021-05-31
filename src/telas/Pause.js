import functions from "./navegacao.js"
import config from "./Config.js"

const get = id => document.getElementById(id)
const gameDiv = get('game')
const tela = get('tela')

export default function viewPause({play, newGame,game}) {
    const fieldset = document.createElement('fieldset')
    fieldset.id = "pause"
    fieldset.innerHTML = `
    <legend>Pause</legend>
    <button id="continue" class="focus">CONTINUE</button>
    <button id="config">OPÇÕES</button>
    <button id="new-game">NEW GAME</button>`
    tela.insertBefore(fieldset, gameDiv)
    get('continue').onclick = () => {
        tela.removeChild(fieldset)
        setTimeout( play, 150)
    }
    get('new-game').onclick = () => {
        tela.removeChild(fieldset)
        setTimeout( newGame, 150)
    }
    get('config').onclick = async () => {
        const value = await config(game)
        window.onkeydown = event => functions[event.key]?.(fieldset)
        value.filter( e => e !== undefined && e !== null)
        .forEach( ([chave, valor]) => {
            setConfig(chave,valor)
        })
    }
    window.onkeydown = event => functions[event.key]?.(fieldset)
}