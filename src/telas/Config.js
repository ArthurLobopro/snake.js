import functions from "./navegacao.js"
import velocidade from "./configs/velocidade.js"

const get = id => document.getElementById(id)
const gameDiv = get('game')

export default async function config(game) {
    const pause = get("pause")
    const fieldset = document.createElement('fieldset')
    const configs = {
        velocidade,
    }
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
    let value = []
    const buttons = fieldset.querySelectorAll('button')
    window.onkeydown = event => functions[event.key]?.(fieldset)
    return new Promise( resolve => {
        const voltar = () => {
            gameDiv.style.display = ""
            pause.style.display = ""
            tela.removeChild(fieldset)
            console.log(value);
            resolve(value)
        }
        configs.voltar = voltar
        buttons.forEach( e => {
            e.onclick = async () => {
                value.push(await configs[e.dataset.type](game))
            }
        })
    })
}