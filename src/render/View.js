import { getColors } from "./Data.js"
import { loadImage } from "./Util.js"
import { game } from "./Game.js"
import { snake } from "./Snake.js"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

//Cores usadas no jogo
class Colors {
    snake = ""
    background = ""
    snake_tail = ""

    constructor() {
        const colors = getColors()
        for(const colorName in colors){
            this[colorName] = colors[colorName]
        }
    }

    /**
     * @param {{ snake: string; background: string; snake_tail: string; }} colors
     */
    set colors(colors){
        console.log(colors);
        Object.entries(colors).forEach( ([name, color]) => {
            this[name] = color
        })
    }
}

const colors = new Colors()


const fruits = {
    laranja: await loadImage(appPath, "assets/frutas/laranja.png"),
    maca: await loadImage(appPath, "assets/frutas/maca.png"),
    cereja: await loadImage(appPath, "assets/frutas/cereja.png"),
    coco: await loadImage(appPath, "assets/frutas/coco.png")
}

const lang = {
    up: await loadImage(appPath, "assets/lingua/lingua-up.png"),
    down: await loadImage(appPath, "assets/lingua/lingua-down.png"),
    left: await loadImage(appPath, "assets/lingua/lingua-left.png"),
    right: await loadImage(appPath, "assets/lingua/lingua-right.png")
}

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
    let { type } = fruit
    type = type ?? "maca"
    ctx.drawImage(fruits[type], px * unity, py * unity)
}

const drawLang = () => {
    const { direction = "right" } = snake
    const [px, py] = getLangPosition()
    ctx.drawImage(lang[direction], px, py)
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

export { renderAll, colors, lang }