import functions from "./navegacao.js"

const get = id => document.getElementById(id)
const gameDiv = get('game')
const tela = get('tela')

export default function viewPause({play, newGame}) {
    const fieldset = document.createElement('fieldset')
    fieldset.innerHTML = `
    <legend>Pause</legend>
    <button id="continue" class="focus">CONTINUE</button>
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
    window.onkeydown = event => functions[event.key]?.(fieldset)
}