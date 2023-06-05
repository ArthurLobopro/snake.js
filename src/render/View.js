import { getColors } from "./Data.js"
import { snake } from "./Snake.js"
import { game_screen_components } from "./ScreenManager.js"
import { sprites } from "./Sprites.js"

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
        right: () => [((px + 1) * 15) - 10, py * 15],
        left: () => [((px - 1) * 15) + 5, py * 15],
        up: () => [px * 15, ((py - 1) * 15) + 5],
        down: () => [px * 15, ((py + 1) * 15) - 10]
    }

    return positions[direction]()
}
//#endregion

//#region Draw
export class Drawer {
    constructor(game) {
        this.game = game
    }

    get ctx() {
        const canvas = game_screen_components.canvas
        return canvas.getContext("2d")
    }

    background() {
        const { width, height } = this.game
        this.ctx.fillStyle = colors.background
        this.ctx.fillRect(0, 0, width, height)
    }

    fruit() {
        const { py, px } = this.game.fruit
        const { unity, fruit } = this.game
        let { type = "maca" } = fruit
        this.ctx.drawImage(sprites.fruits[type], px * unity, py * unity)
    }

    lang() {
        const { direction = "right" } = snake
        const [px, py] = getLangPosition()
        this.ctx.drawImage(sprites.lang[direction], px, py)
    }

    snake() {
        const { px, py, tail } = snake
        const { unity } = this.game

        tail.forEach(({ py, px }) => {
            this.ctx.fillStyle = colors.snake_tail
            this.ctx.fillRect(px * unity, py * unity, unity, unity)
        })

        this.ctx.fillStyle = colors.snake
        this.ctx.fillRect(px * unity, py * unity, unity, unity)
    }

    renderAll() {
        const render_order = [
            "background",
            "fruit",
            "snake",
            "lang"
        ]

        render_order.forEach(render => {
            this[render]()
        })
    }
}

//#endregion



export { colors }