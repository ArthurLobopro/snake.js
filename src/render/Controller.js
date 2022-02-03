import { renderAll } from "./View.js"
import { snake, moves, move } from "./Snake.js"
import { game, pause, colisao } from "./Game.js"
import { loadCheat } from "./Cheats.js"
import config from "./telas/Config.js"

const get = id => document.getElementById(id)

const recordDiv = get('recorde')

const comands = {
    "Escape": async () => {
        if (game.status === "active") return pause()
        if (game.status === "inative") {
            await config()
            window.onkeydown = mainKeyDown
        }
    }
}

const render = async (canMove = true) => {
    if (!await colisao() && canMove) {
        await move()
    }

    renderAll()

    snake.moveLock = false
    get("pontos").innerText = game.points
}

const mainKeyDown = event => {
    const key = event.key.lenght == 1 ? event.key.toLowerCase() : event.key
    if (game.status === "inative") {
        if (moves[key]) {
            game.status = "active"
            moves[key]()
            game.interval = setInterval(render, game.velocidade)
        }
    } else {
        moves[key]?.()
    }
    comands[key]?.()
    loadCheat(event)
}

window.onkeydown = mainKeyDown

window.onload = async () => {
    render()
    recordDiv.innerText = game.recorde
}

export { mainKeyDown, render, get }