import functions from "./navegacao.js"

const tela = document.getElementById('tela')
export default async function viewGameOver({pontos, recorde, img}) {
    const telaGameOver = document.createElement('fieldset')
    telaGameOver.innerHTML = `
    <legend>GAME OVER</legend>
    <div class="table">
        <div class="line">
            <div>Pontuação:</div>
            <div>${pontos}</div>
        </div>
        <div class="line">
            <div>Recorde:</div>
            <div>${recorde}</div>
        </div>
    </div>
    <img src="${img}" id="game-over-print">
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