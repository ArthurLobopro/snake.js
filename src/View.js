const canvas = document.getElementById('game')
const ctx = canvas.getContext("2d")
//Cores usadas no jogo
const colors = {
    background: "#303030",
    snake: "#4AA96C",
    cauda_snake: "#9FE6A0",
    red_fruit: "#f55c47"
}
const frutas = {}

const laranja = new Image()
laranja.src = "./assets/laranja.png"
laranja.onload = () => frutas.laranja = laranja

const maca = new Image()
maca.src = "./assets/maca.png"
maca.onload = () => frutas.maca = maca

const lingua = {}
//Imagens da lingua
const upImg = new Image()
upImg.src = "./assets/lingua-up.png"
upImg.onload = () => lingua.up = upImg

const downImg = new Image()
downImg.src = "./assets/lingua-down.png"
downImg.onload = () => lingua.down = downImg

const leftImg = new Image()
leftImg.src = "./assets/lingua-left.png"
leftImg.onload = () => lingua.left = leftImg

const rightImg = new Image()
rightImg.src = "./assets/lingua-right.png"
rightImg.onload = () => lingua.right = rightImg

//Pega a posição da cabeça da cobra e calcula uma posição para a lingua
const getPosLingua =  (snake) => {
    let { direcao, px, py } = snake
    direcao = direcao ?? "right"

    if(direcao === "right")
        return [((px + 1) * 15) - 10.5, py * 15]
    
    if(direcao === "left")
        return [((px - 1) * 15) + 5, py * 15]

    if(direcao === "up")
        return [px * 15, ((py - 1) * 15) + 5]

    if(direcao === "down")
        return [px * 15, ((py + 1) * 15) - 10]
}

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
export { drawBackground, drawFruit, drawLingua, drawSnake }