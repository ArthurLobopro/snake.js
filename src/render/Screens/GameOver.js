import functions from "./navegacao.js"
import { game, canvas } from "../Game.js"

const tela = document.getElementById('tela')
export default async function viewGameOver() {
    
    const telaGameOver = document.createElement('fieldset')
    telaGameOver.innerHTML = `
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
    <button class="focus">NEW GAME</button>`
    tela.appendChild(telaGameOver)
    const button = telaGameOver.getElementsByTagName('button')[0]
    window.onkeydown = event => functions[event.key]?.(telaGameOver)
    return new Promise( resolve => {
        button.onclick = () => {
            tela.removeChild(telaGameOver)
            resolve(true)
        }
    })
}