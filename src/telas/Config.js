import functions from "./navegacao.js"
import velocidade from "./configs/velocidade.js"

const get = id => document.getElementById(id)
const gameDiv = get('game')

export default async function config(game) {
    const pause = get("pause")
    const fieldset = document.createElement('fieldset')
    const configs = {
        velocidade,
        voltar: () => {
            gameDiv.style.display = ""
            pause.style.display = ""
            tela.removeChild(fieldset)
        }
    }
    fieldset.id = "config"
    fieldset.innerHTML = `
    <legend>CONFIGURAÇÃO</legend>
    <div>
        <div>
            <button data-type="velocidade">Velocidade</button>
            <button data-type="voltar" class="focus">Voltar</button>
        </div>
    </div>`
    gameDiv.style.display = "none"
    pause.style.display = "none"
    tela.appendChild(fieldset)
    let value
    const buttons = fieldset.querySelectorAll('button')
    buttons.forEach( e => {
        e.onclick = async () => value = await configs[e.dataset.type](game)
    })
    return new Promise( resolve => {
        setInterval(() => {
            if(typeof value === "object"){
                resolve(value)
            }
        }, 150);
    })
}