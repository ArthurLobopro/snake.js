import { renderAll } from "./View.js"
import { snake } from "./Snake.js"
import { game } from "./Game.js"
import { loadCheat } from "./Cheats.js"
import { game_screen_components, screens } from "./ScreenManager.js"

const recordDiv = game_screen_components.record_div

const moves = {
    "arrowleft": () => snake.setDirection("left"),
    "arrowdown": () => snake.setDirection("down"),
    "arrowright": () => snake.setDirection("right"),
    "arrowup": () => snake.setDirection("up"),
    "w": () => snake.setDirection("up"),
    "a": () => snake.setDirection("left"),
    "s": () => snake.setDirection("down"),
    "d": () => snake.setDirection("right")
}

const comands = {
    "escape": async () => {
        if (game.status === "active") return game.pause()
        if (game.status === "inative") {
            screens.config.show(screens.gameScreen)
            window.onkeydown = mainKeyDown
        }
    }
}

const render = async () => {
    game.loadTurn()
    renderAll()
}

const mainKeyDown = event => {
    const key = event.key.toLowerCase()
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

export { mainKeyDown, render }