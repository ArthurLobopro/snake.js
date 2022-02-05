import { colors, lang, setColors } from "../../View.js"
import { render } from "../../Controller.js"
import { saveColors } from "../../Data.js"

const colorsTemp = {}

const tela = document.getElementById('tela')

const renderPreview = () => {
    const canvas = document.getElementById('snake-preview')
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = colorsTemp.background
    ctx.fillRect(0, 0, 135, 135)
    ctx.fillStyle = colorsTemp.snake
    ctx.fillRect(5 * 15, 60, 15, 15)
    ctx.fillStyle = colorsTemp.cauda_snake
    for (let i = 2; i < 5; i++) {
        ctx.fillRect(i * 15, 60, 15, 15)
    }
    ctx.drawImage(lang.right, ((6 * 15) - 10), 60)
}

const functions = {
    reset: () => {
        document.querySelector('#color-snake').value = colors.snake
        document.querySelector('#color-cauda-snake').value = colors.cauda_snake
        document.querySelector('#color-background').value = colors.background
        colorsTemp.snake = colors.snake
        colorsTemp.cauda_snake = colors.cauda_snake
        colorsTemp.background = colors.background
        renderPreview()
    },
    default: async () => {
        const { snake, cauda_snake, background } = await getDefaultColors()
        document.querySelector('#color-snake').value = snake
        document.querySelector('#color-cauda-snake').value = cauda_snake
        document.querySelector('#color-background').value = background
        colorsTemp.snake = snake
        colorsTemp.cauda_snake = cauda_snake
        colorsTemp.background = background
        renderPreview()
    }
}

export default function cores() {
    const full = document.createElement('div')
    full.className = "full"
    full.innerHTML = `
    <fieldset id="color-config">
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
                <div>
                    Fundo: <input type="color" value="${colors.background}" data-name="background" id="color-background">
                </div>
                <div>
                    <button data-func="reset">Zerar</button>
                    <button data-func="default">Usar Padrão</button>
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
        </div>
    </fieldset>`
    colorsTemp.snake = colors.snake
    colorsTemp.cauda_snake = colors.cauda_snake
    colorsTemp.background = colors.background
    tela.appendChild(full)
    const fieldset = full.querySelector('fieldset')
    renderPreview()
    const colorInputs = fieldset.querySelectorAll('input[type=color]')
    colorInputs.forEach(e => {
        e.oninput = event => {
            const name = event.target.dataset.name
            colorsTemp[name] = event.target.value
            renderPreview()
        }
    })

    const resetButtons = document.querySelectorAll('.inputs button')
    resetButtons.forEach(e => {
        e.onclick = event => {
            functions[event.target.dataset.func]()
        }
    })

    const buttons = fieldset.querySelectorAll('.buttons button')
    buttons.forEach(e => {
        e.onclick = event => {
            tela.removeChild(full)
            if (event.target.value == "1") {
                const values = Array.from(colorInputs).map(e => {
                    return [e.dataset.name, e.value]
                })
                values.forEach(([key, value]) => {
                    setColors(key, value)
                })
                saveColors(colors)
                render(false)
            }
        }
    })
}