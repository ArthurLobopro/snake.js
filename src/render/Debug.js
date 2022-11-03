import { game } from "./Game.js"
import { screens } from "./ScreenManager.js"
import { snake } from "./Snake.js"
import { renderAll } from "./View.js"

async function appendDebug() {
    const Debug = {
        pause() {
            game.pause()
        },
        newGame() {
            game.newGame()
        },
        continueGame() {
            game.play()
        },
        renderAll,
        showGame() {
            console.log(game)
        },
        showSnake() {
            console.log(snake)
        },
        showScreens() {
            console.log(screens)
        }
    }

    window.Debug = Debug
}

setTimeout(appendDebug, 1000)