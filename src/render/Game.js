import { mainKeyDown, render } from "./Controller.js"
import { getData, saveRecorde } from "./Data.js"
import viewPause from "./telas/Pause.js"
import viewGameOver from "./telas/GameOver.js"
import { setSnakeSettings, snake } from "./Snake.js"
import { randint } from "./Util.js"

const get = id => document.getElementById(id)

const canvas = get('canvas')

class Game {
    //Atributes
    unity = 15
    quantX = 21
    quantY = 21
    interval = null
    width = 0
    height = 0

    frutas = [
        {
            type: "maca",
            value: 100
        },
        {
            type: "laranja",
            value: 250
        },
        {
            type: "cereja",
            value: 300
        },
        {
            type: "coco",
            value: 500
        }
    ]

    constructor() {
        this.height = this.quantY * this.unity
        this.width = this.quantX * this.unity
        canvas.width = this.width
        canvas.height = this.height
        this.setDefaultValues()
    }

    async setDefaultValues() {
        this.status = "inative"
        this.points = 0
        this.imortal = false
        this.canSaveRecord = true
        this.fruit = {
            py: 11,
            px: 15,
            value: 100,
            type: "maca"
        }
        const data = Object.entries(await getData())
        data.forEach(([key, value]) => {
            this[key] = value
        })
    }

    reset() {
        this.setDefaultValues()
    }
}

const game = new Game()

const setConfig = (key, value) => {
    game[key] = value
}

const randItem = arr => {
    return arr[randint(0, arr.length - 1)]
}

const play = () => {
    if (game.status === "paused") {
        window.onkeydown = mainKeyDown
        game.status = "active"
        game.interval = setInterval(render, game.velocidade)
    }
}

const pause = () => {
    if (game.status === "active") {
        game.status = "paused"
        clearInterval(game.interval)
        viewPause({ play, newGame })
    }
}

const newGame = async () => {
    window.onkeydown = mainKeyDown
    await setSnakeSettings()
    game.reset()
    get("pontos").innerText = game.points
    render()
}

const gameOver = async () => {
    clearInterval(game.interval)
    get('game').style.display = "none"
    if (game.points > game.recorde && game.canSaveRecord) {
        game.recorde = game.points
        saveRecorde(game.recorde)
        get('recorde').innerText = game.recorde
    }
    await viewGameOver({ pontos: game.points, recorde: game.recorde, img: canvas.toDataURL('image/png') })
    await newGame()
    get('game').style.display = ""
}

const spawFruit = async () => {
    const { quantX, quantY } = game
    const { type, value } = randItem(game.frutas)
    while (true) {
        const px = randint(0, quantX - 1)
        const py = randint(0, quantY - 1)
        if (snake.px !== px && snake.py !== py) {
            const { cauda } = snake
            let find = cauda.map(q => {
                if (q.px === px && q.py === py) {
                    return 't'
                }
                return 'f'
            })
            find = find.join('')
            if (find.indexOf('t') === -1) {
                game.fruit = {
                    px, py,
                    type, value
                }
                return
            }
        }
    }
}

const colisao = async () => {
    const { px, py, cauda } = snake

    if (snake.length == game.width * game.height) {
        gameOver()
        return true
    }

    if (game.fruit.px === px && game.fruit.py === py) {
        game.points += game.fruit.value
        await spawFruit()
        snake.cauda.unshift(snake.ultima)
    }
    if (game.imortal) return false
    return new Promise(resolve => {
        cauda.forEach(q => {
            if (q.px === px && q.py === py) {
                resolve(true)
                gameOver()
            }
        })
        resolve(false)
    })
}

export { game, setConfig, pause, newGame, spawFruit, colisao }