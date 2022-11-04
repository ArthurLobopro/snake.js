import { getColors } from "./Data.js"
import { game } from "./Game.js"
import { snake } from "./Snake.js"
import { game_screen_components } from "./ScreenManager.js"
import { sprites } from "./Sprites.js"


const canvas = game_screen_components.canvas
const ctx = canvas.getContext("2d")


//Cores usadas no jogo
class Colors {
    snake = ""
    background = ""
    snake_tail = ""

    constructor() {
        const colors = getColors()
        for (const colorName in colors) {
            this[colorName] = colors[colorName]
        }
    }

    /**
     * @param {{ snake: string; background: string; snake_tail: string; }} colors
     */
    set colors(colors) {
        console.log(colors)
        Object.entries(colors).forEach(([name, color]) => {
            this[name] = color
        })
    }
}

const colors = new Colors()

//#region Calcs
//Pega a posição da cabeça da cobra e calcula uma posição para a lingua
const getLangPosition = () => {
    let { direction = "right", px, py } = snake

    const positions = {
        right: () => [((px + 1) * 15) - 10.5, py * 15],
        left: () => [((px - 1) * 15) + 5, py * 15],
        up: () => [px * 15, ((py - 1) * 15) + 5],
        down: () => [px * 15, ((py + 1) * 15) - 10]
    }

    return positions[direction]()
}
//#endregion

//#region Draw
const drawBackground = () => {
    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, game.width, game.height)
}

const drawFruit = () => {
    const { py, px } = game.fruit
    const { unity, fruit } = game
    let { type = "maca" } = fruit
    ctx.drawImage(sprites.fruits[type], px * unity, py * unity)
}

const drawLang = () => {
    const { direction = "right" } = snake
    const [px, py] = getLangPosition()
    ctx.drawImage(sprites.lang[direction], px, py)
}

const drawSnake = () => {
    const { px, py, tail } = snake
    const { unity } = game

    tail.forEach(({ py, px }) => {
        ctx.fillStyle = colors.snake_tail
        ctx.fillRect(px * unity, py * unity, unity, unity)
    })

    ctx.fillStyle = colors.snake
    ctx.fillRect(px * unity, py * unity, unity, unity)
}
//#endregion

const renderAll = () => {
    drawBackground()
    drawFruit()
    drawSnake()
    drawLang()
}

export { renderAll, colors }