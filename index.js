import { drawBackground, drawFruit, drawLingua, drawSnake } from "./src/View.js"
import { getData } from "./src/Data.js"
import { snake, setSnakeSettings, moves, move } from "./src/Snake.js"
import { 
    game, setGameSettings, pause, colisao
} from "./src/Game.js"

const get = id => document.getElementById(id)

const recordDiv = get('recorde')

const comands = {
    "Escape": pause,
}

const render = async () => {
    if(!await colisao()){
        await move()
    }

    drawBackground(game)
    drawFruit(game)
    drawSnake(snake, game)
    drawLingua(snake)
    
    snake.moveLock = false
    get("pontos").innerText = game.pontos
}

const mainKeyDown = event => {
    const key = event.key.lenght == 1 ? event.key.toLowerCase() : event.key
    if(game.status === "inative"){
        if(moves[key]){
            game.status = "active"
            moves[key]()
            game.interval = setInterval( render, game.velocidade)
        }
    }else{
        moves[key]?.()
        comands[key]?.()
    }
}

window.onkeydown = mainKeyDown

window.onload = async () => {
    await setGameSettings()
    const data = Object.entries(await getData())
    data.forEach( ([key, value]) => {
        game[key]= value
    })
    await setSnakeSettings()
    render()
    recordDiv.innerText = game.recorde
}

export { mainKeyDown, render, get }