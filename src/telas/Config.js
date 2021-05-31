import functions from "./navegacao.js"
import velocidade from "./configs/velocidade.js"

const get = id => document.getElementById(id)
const gameDiv = get('game')

const configs = {
    velocidade,
    voltar: () => {
        gameDiv.style.display = ""
        pause.style.display = ""
        tela.removeChild(fieldset)
    }
}

export default async function config(game) {
    const pause = get("pause")
    const fieldset = document.createElement('fieldset')
    fieldset.id = "config"
    fieldset.innerHTML = `
    <legend>CONFIGURAÇÃO</legend>
    <div>
        <div>
            <button data-type="velocidade" class="focus">Velocidade</button>
            <button data-type="voltar">Voltar</button>
        </div>
    </div>`
    gameDiv.style.display = "none"
    pause.style.display = "none"
    tela.appendChild(fieldset)
    const buttons = fieldset.querySelectorAll('button')
    window.onkeydown = event => functions[event.key]?.(fieldset)
    buttons.forEach( e => {
        e.onclick = () => {
            configs[e.dataset.type](game)
        }
    })
}