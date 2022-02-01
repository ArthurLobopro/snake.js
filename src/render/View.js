import { getData , getColors } from "./Data.js"
import { loadImage } from "./Util.js"
import { game } from "./Game.js"
import { snake } from "./Snake.js"
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
//Cores usadas no jogo
const colors = getColors()
const setColors = (key,value) => colors[key] = value

const frutas = {
    laranja: await loadImage(appPath, "assets/frutas/laranja.png"),
    maca: await loadImage(appPath, "assets/frutas/maca.png"),
    cereja: await loadImage(appPath, "assets/frutas/cereja.png"),
    coco: await loadImage(appPath, "assets/frutas/coco.png")
}

const lingua = {
    up: await loadImage(appPath, "assets/lingua/lingua-up.png"),
    down: await loadImage(appPath, "assets/lingua/lingua-down.png"),
    left: await loadImage(appPath, "assets/lingua/lingua-left.png"),
    right: await loadImage(appPath, "assets/lingua/lingua-right.png")
}

//#region Cálculos
//Pega a posição da cabeça da cobra e calcula uma posição para a lingua
const getPosLingua =  (snake) => {
    let { direcao, px, py } = snake
    direcao = direcao ?? "right"

    const positions = {
        right: () => [((px + 1) * 15) - 10.5, py * 15],
        left: () => [((px - 1) * 15) + 5, py * 15],
        up: () => [px * 15, ((py - 1) * 15) + 5],
        down: () => [px * 15, ((py + 1) * 15) - 10]
    }

    return positions[direcao]()
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
    // ctx.fillStyle = colors.red_fruit
    // ctx.fillRect(px * unity, py * unity, unity, unity)
    ctx.drawImage(frutas[type], px * unity, py * unity)
}

const drawLingua = () => {
    let { direcao } = snake
    direcao = direcao ?? "right"
    const [ px, py ] = getPosLingua(snake)
    ctx.drawImage(lingua[direcao],  px , py )
}

const drawSnake = () => {
    const { px, py, cauda } = snake
    const { unity } = game
    
    cauda.forEach( ({py,px}) => {
        ctx.fillStyle = colors.cauda_snake
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
    drawLingua()
}

export { renderAll, colors, lingua, setColors}