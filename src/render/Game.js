import { mainKeyDown, render } from "./Controller.js"
import { getData, saveRecorde } from "./Data.js"
import viewPause from "./Screens/Pause.js"
import viewGameOver from "./Screens/GameOver.js"
import { snake } from "./Snake.js"
import { randint, randItem } from "./Util.js"

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

    fruits = [
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

    async spawFruit() {
        const { quantX, quantY } = this
        const { type, value } = randItem(this.fruits)
        while (true) {
            const px = randint(0, quantX - 1)
            const py = randint(0, quantY - 1)
            if (snake.px !== px && snake.py !== py) {
                let find = snake.tail.map(q => q.px === px && q.py === py)
                if (find.indexOf(true) === -1) {
                    this.fruit = {
                        px, py,
                        type, value
                    }
                    return
                }
            }
        }
    }

    play() {
        if (this.status === "paused") {
            window.onkeydown = mainKeyDown
            this.status = "active"
            this.interval = setInterval(render, this.velocidade)
        }
    }

    pause() {
        if (this.status === "active") {
            this.status = "paused"
            clearInterval(this.interval)
            viewPause()
        }
    }

    async gameOver() {
        clearInterval(this.interval)
        get('game').style.display = "none"
        if (this.points > this.recorde && this.canSaveRecord) {
            this.recorde = this.points
            saveRecorde(this.recorde)
            get('recorde').innerText = this.recorde
        }
        await viewGameOver()
        await newGame()
        get('game').style.display = ""
    }

    async newGame ()  {
        window.onkeydown = mainKeyDown
        snake.reset()
        this.reset()
        get("pontos").innerText = this.points
        render()
    }

    reset() {
        this.setDefaultValues()
    }
}

const game = new Game()

const setConfig = (key, value) => {
    game[key] = value
}

const colisao = async () => {
    const { px, py, tail } = snake

    //Tamanho máximo da cobra
    if (snake.length == game.width * game.height) {
        game.gameOver()
        return true
    }
    
    //Colisão com frutas
    if (game.fruit.px === px && game.fruit.py === py) {
        game.points += game.fruit.value
        await game.spawFruit()
        snake.tail.unshift(snake.last)
    }

    if (game.imortal) return false

    //Colisão com a cauda
    return new Promise(resolve => {
        tail.forEach(q => {
            if (q.px === px && q.py === py) {
                resolve(true)
                game.gameOver()
            }
        })
        resolve(false)
    })
}

export { game, setConfig, colisao, canvas }