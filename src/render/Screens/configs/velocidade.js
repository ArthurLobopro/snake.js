import { setConfig } from "../../Game.js"
import { saveVelocidade } from "../../Data.js"

const tela = document.getElementById('tela')
export default function velocidade(game){
    const {velocidade} = game
    const full = document.createElement('div')
    full.classList.add('full')
    full.innerHTML = `
    <fieldset id="">
        <legend class="title">Velocidade</legend>        
            <div class="text">
                <div class="line">
                    <div>Lento</div>
                    <div class="check" data-check="${velocidade === 300 ? true : false}" data-value="300"></div>
                </div>
                <div class="line">
                    <div>Médio</div>
                    <div class="check" data-check="${velocidade === 200 ? true : false}" data-value="200"></div>
                </div>
                <div class="line">
                    <div>Rápido</div>
                    <div class="check" data-check="${velocidade === 100 ? true : false}" data-value="100"></div>
                </div>
            </div>
            <div class="buttons">
                <button value="1">
                    OK
                </button>
                <button class="cancel" value="0">
                    Cancelar
                </button>
            </div>
    </fieldset>`
    const fieldset = full.querySelector('fieldset')
    const checks = fieldset.querySelectorAll('.check')
    checks.forEach( e => {
        e.onclick = event => {
            const target = event.target
           
            document.querySelectorAll('.check').forEach( e => {
                e.dataset.check = "false"
            })
           
            target.dataset.check = "true"
        }
    })
    tela.appendChild(full)
    const buttons = fieldset.querySelectorAll('button')
    
    buttons.forEach( e => {
        e.onclick = event =>{
            tela.removeChild(full)
            if(event.target.value == "1"){
                const value = Number(Array.from(checks).find( e => e.dataset.check === "true").dataset.value)
                setConfig('velocidade',value)
                saveVelocidade(value)
            }
        }
    })
}