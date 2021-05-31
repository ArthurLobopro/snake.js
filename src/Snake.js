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
    
    if(direcao !== null){
        snake.cauda.push( {px: snake.px, py: snake.py})
        snake.ultima = snake.cauda.shift()
    }

    if(direcao === "up"){
        return snake.py = (snake.py - 1) >= 0 ? snake.py - 1 : quantY - 1
    }
    if(direcao === "left"){
        return snake.px = (snake.px - 1) >= 0 ? snake.px - 1 : quantX - 1
    }

    if(direcao === "down"){
        if(snake.py + 1 < quantY){
            return snake.py += 1
        }
        return snake.py = snake.py - quantY + 1
    }

    if(direcao === "right"){
        if(snake.px + 1 < quantX){
            return snake.px += 1
        }
        return snake.px = snake.px - quantX + 1
    }
}

export { snake, setSnakeSettings, moves, move }