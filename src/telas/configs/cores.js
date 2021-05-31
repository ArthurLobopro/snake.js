import { colors, lingua} from "../../View.js"

const colorsTemp = colors

const tela = document.getElementById('tela')

const renderPreview = () => {
    const canvas = document.getElementById('snake-preview')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0,0, 135, 135)
    ctx.fillStyle = colorsTemp.snake
    ctx.fillRect(5*15, 60, 15, 15)
    ctx.fillStyle = colorsTemp.cauda_snake
    for(let i = 2; i< 5; i++){
        ctx.fillRect( i*15, 60, 15, 15)
    }
    ctx.drawImage(lingua.right,  ((6 * 15)- 10) ,60)
}

export default function cores(){
    const fieldset = document.createElement('fieldset')
    fieldset.id = "color-config"
    fieldset.innerHTML = `
    <legend>CORES</legend>
    <div class="container">
        <canvas width="135" height="135" id="snake-preview"></canvas>
        <div class="inputs">
            <div>
                Cor da cabeça: <input type="color" value="${colors.snake}" data-name="snake" id="color-snake">
            </div>
            <div>
                Cor da cobra: <input type="color" value="${colors.cauda_snake}" data-name="cauda_snake" id="color-cauda-snake">
            </div>
        </div>
    </div>
    <div class="buttons">
        <button value="1">
            OK
        </button>
        <button class="cancel" value="0">
            Cancelar
        </button>
    </div>`
    tela.appendChild(fieldset)
    renderPreview()
    const colorInputs = document.querySelectorAll('input[type=color]')
    colorInputs.forEach( e => {
        e.oninput = event => {
            const name = event.target.dataset.name
            colorsTemp[name]= event.target.value
            renderPreview()
        }
    })
}