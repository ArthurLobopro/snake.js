import { getDefaultColors } from "./Settings.js"
import { getData } from "./Data.js"
import { loadImage } from "./Util.js"
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
//Cores usadas no jogo
const colors = {}
const setColors = (key,value) => colors[key] = value

const setDinamicColors = async () => {
    const defaultColors = Object.entries(await getDefaultColors())
    defaultColors.forEach( ([key, value]) => {
        setColors(key,value)
    })

    const {colors} = await getData()
    let dinamicColors = Object.entries(colors)
    
    console.log(dinamicColors);
    dinamicColors.forEach( ([key, value]) => {
        setColors(key,value)
    })
}

setDinamicColors()

const frutas = {
    laranja: await loadImage("./assets/frutas/laranja.png"),
    maca: await loadImage("./assets/frutas/maca.png"),
    cereja: await loadImage("./assets/frutas/cereja.png"),
    coco: await loadImage("./assets/frutas/coco.png")
}

const lingua = {
    up: await loadImage("./assets/lingua/lingua-up.png"),
    down: await loadImage("./assets/lingua/lingua-down.png"),
    left: await loadImage("./assets/lingua/lingua-left.png"),
    right: await loadImage("./assets/lingua/lingua-right.png")
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
const drawBackground = (game) => {
    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, game.width, game.height)
}

const drawFruit = (game) => {
    const { py, px } = game.fruit
    const { unity, fruit } = game
    let { type } = fruit
    type = type ?? "maca"
    // ctx.fillStyle = colors.red_fruit
    // ctx.fillRect(px * unity, py * unity, unity, unity)
    ctx.drawImage(frutas[type], px * unity, py * unity)
}

const drawLingua = (snake) => {
    let { direcao } = snake
    direcao = direcao ?? "right"
    const [ px, py ] = getPosLingua(snake)
    ctx.drawImage(lingua[direcao],  px , py )
}

const drawSnake = (snake, game) => {
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

export { drawBackground, drawFruit, drawLingua, drawSnake, colors, lingua, setColors}