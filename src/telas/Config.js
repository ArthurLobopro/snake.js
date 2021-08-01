import functions from "./navegacao.js"
import velocidade from "./configs/velocidade.js"
import cores from "./configs/cores.js"
import { game } from "../Game.js"

const get = id => document.getElementById(id)
const gameDiv = get('game')

const configs = {
    velocidade, 
    cores
}

export default async function config() {
    const pause = game.status === "paused" ? get("pause-wrapper") : null
    const fieldset = document.createElement('fieldset')
    fieldset.id = "config"
    fieldset.innerHTML = `
    <legend>CONFIGURAÇÃO</legend>
    <div>
        <div class="button-wrapper">
            <button data-type="velocidade" class="focus">Velocidade</button>
            <button data-type="cores">Cores</button>
            <button data-type="voltar">Voltar</button>
        </div>
    </div>`
    gameDiv.style.display = "none"

    if(game.status === "paused"){
        pause.style.display = "none"
    }

    tela.appendChild(fieldset)
    const buttons = fieldset.querySelectorAll('button')
    window.onkeydown = event => functions[event.key]?.(fieldset)
    return new Promise( resolve => {
        buttons.forEach( e => {
            e.onclick = () => {
                const voltar = () => {
                    gameDiv.style.display = ""
                    if(game.status === "paused"){
                        pause.style.display = ""
                    }
                    tela.removeChild(fieldset)
                    resolve(true)
                }
                configs.voltar = voltar
                configs[e.dataset.type](game)
            }
        })
    })
}