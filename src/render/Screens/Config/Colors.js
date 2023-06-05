import { colors } from "../../View.js"
import { saveColors } from "../../Data.js"
import { ConfigScreenBase } from "../Screen.js"
import { screens } from "../../ScreenManager.js"
import { sprites } from "../../Sprites.js"
import { draw } from "../../Global.js"

export class ColorsScreen extends ConfigScreenBase {
    constructor() {
        super()
    }

    buildFunction() {

        const colorsTemp = {
            snake: "",
            background: "",
            snake_tail: ""
        }

        const setColorsTemp = colors => {
            Object.entries(colors).forEach(([name, color]) => {
                colorsTemp[name] = color
            })
        }

        const colors_screen = document.createElement('div')
        colors_screen.className = "screen-wrapper"

        colors_screen.innerHTML = `
        <fieldset id="color-config">
            <legend>CORES</legend>
            <div class="container">
                <canvas width="135" height="135" id="snake-preview"></canvas>
                <div class="inputs">
                    <div>
                        Cor da cabeça: <input type="color" value="${colors.snake}" data-name="snake" id="color-snake">
                    </div>
                    <div>
                        Cor da cobra: <input type="color" value="${colors.snake_tail}" data-name="snake_tail" id="color-snake-tail">
                    </div>
                    <div>
                        Fundo: <input type="color" value="${colors.background}" data-name="background" id="color-background">
                    </div>
                    <div>
                        <button data-action="reset">Zerar</button>
                        <button data-action="default">Usar Padrão</button>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <button value="save">
                    OK
                </button>
                <button class="cancel" value="cancel">
                    Cancelar
                </button>
            </div>
        </fieldset>`

        setColorsTemp(colors)

        const renderPreview = () => {
            const canvas = colors_screen.querySelector('#snake-preview')
            const ctx = canvas.getContext('2d')

            ctx.fillStyle = colorsTemp.background
            ctx.fillRect(0, 0, 135, 135)
            ctx.fillStyle = colorsTemp.snake
            ctx.fillRect(5 * 15, 60, 15, 15)
            ctx.fillStyle = colorsTemp.snake_tail

            for (let i = 2; i < 5; i++) {
                ctx.fillRect(i * 15, 60, 15, 15)
            }
            ctx.drawImage(sprites.lang.right, ((6 * 15) - 10), 60)
        }

        renderPreview()

        const colorInputs = colors_screen.querySelectorAll('input[type=color]')
        colorInputs.forEach(colorInput => {
            colorInput.oninput = () => {
                const name = colorInput.dataset.name
                colorsTemp[name] = colorInput.value
                renderPreview()
            }
        })

        const resetFunctions = {
            reset: () => {
                colors_screen.querySelector('#color-snake').value = colors.snake
                colors_screen.querySelector('#color-snake-tail').value = colors.snake_tail
                colors_screen.querySelector('#color-background').value = colors.background
                setColorsTemp(colors)
                renderPreview()
            },
            default: () => {
                const defaultColors = gameApi.getDefaultColors()
                colors_screen.querySelector('#color-snake').value = defaultColors.snake
                colors_screen.querySelector('#color-snake-tail').value = defaultColors.snake_tail
                colors_screen.querySelector('#color-background').value = defaultColors.background
                setColorsTemp(defaultColors)
                renderPreview()
            }
        }

        const resetButtons = colors_screen.querySelectorAll('.inputs button')
        resetButtons.forEach(button => {
            button.onclick = () => {
                resetFunctions?.[button.dataset.action]?.()
            }
        })

        const buttons = colors_screen.querySelectorAll('.buttons button')
        buttons.forEach(button => {
            button.onclick = () => {
                if (button.value == "save") {
                    colors.colors = colorsTemp
                    saveColors(colors)
                    draw.renderAll()
                }
                this.close()
                screens.config.addNavigation()
            }
        })

        return colors_screen
    }
}