import { renderAll } from "./View.js"
import { snake } from "./Snake.js"
import { game } from "./Game.js"
import { loadCheat } from "./Cheats.js"
import { screens } from "./ScreenManager.js"

const get = id => document.getElementById(id)

const recordDiv = get('recorde')

const moves = {
    "ArrowLeft": () => snake.setDirection("left"),
    "ArrowDown": () => snake.setDirection("down"),
    "ArrowRight": () => snake.setDirection("right"),
    "ArrowUp": () => snake.setDirection("up"),
    "w": () => snake.setDirection("up"),
    "a": () => snake.setDirection("left"),
    "s": () => snake.setDirection("down"),
    "d": () => snake.setDirection("right")
}

const comands = {
    "Escape": async () => {
        if (game.status === "active") return game.pause()
        if (game.status === "inative") {
            screens.config.show()
            window.onkeydown = mainKeyDown
        }
    }
}

const render = async () => {
    game.loadTurn()
    renderAll()
}

const mainKeyDown = event => {
    const key = event.key.lenght == 1 ? event.key.toLowerCase() : event.key
    if (game.status === "inative") {
        if (moves[key]) {
            game.status = "active"
            moves[key]()
            game.interval = setInterval(render, game.velocity)
        }
    } else {
        moves[key]?.()
    }
    comands[key]?.()
    loadCheat(event)
}

window.onload = async () => {
    recordDiv.innerText = game.recorde
    screens.init.show()
}

export { mainKeyDown, render, get }