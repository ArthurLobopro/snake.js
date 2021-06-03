import { getDefaultSnake } from "./Settings.js"
import { game } from "./Game.js"

const snake = {
    setDirecao(direcao){
        if(this.direcao === direcao) return
        if(this.moveLock) return

        if(this.direcao === "right"){
            if(direcao !== "left")
                this.direcao = direcao
        }

        if(this.direcao === "left"){
            if(direcao !== "right")
                this.direcao = direcao
        }

        if(this.direcao === "up"){
            if(direcao !== "down")
                this.direcao = direcao
        }

        if(this.direcao === "down"){
            if(direcao !== "up")
                this.direcao = direcao
        }
        this.moveLock = true
    }
}

const moves = {
    "ArrowLeft": () => snake.setDirecao("left"),
    "ArrowDown": () => snake.setDirecao("down"),
    "ArrowRight": () => snake.setDirecao("right"),
    "ArrowUp": () => snake.setDirecao("up"),
    "w": () => snake.setDirecao("up"),
    "a": () => snake.setDirecao("left"),
    "s": () => snake.setDirecao("down"),
    "d": () => snake.setDirecao("right")
}

const setSnakeSettings = async ()=> {
    let settings = await getDefaultSnake()
    settings = Object.entries(settings)
    settings.forEach( s => snake[s[0]] = s[1])
}

const move = async () => {
    const { direcao } = snake
    const { quantX, quantY } = game

    const directions = {
        "up":{
            dir:'py', quant: -1
        },
        "left":{
            dir:'px', quant: -1
        },
        "down":{
            dir:'py', quant: 1
        },
        "right":{
            dir:'px', quant: 1
        }
    }
    
    if(direcao !== null){
        snake.cauda.push( {px: snake.px, py: snake.py})
        snake.ultima = snake.cauda.shift()
    }

    snake[directions[direcao].dir] += directions[direcao].quant

    if(snake.py > quantY) return snake.py = 0
    if(snake.px > quantX) return snake.px = 0
    if(snake.py < 0) return snake.py = quantY - 1
    if(snake.px < 0) return snake.px = quantX - 1
}

export { snake, setSnakeSettings, moves, move }