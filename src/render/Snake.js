import { game } from "./Game.js"

class Snake {

    moves = {
        up: () => this.py = (this.py - 1) >= 0 ? this.py - 1 : game.quantY - 1,
        left: () => this.px = (this.px - 1) >= 0 ? this.px - 1 : game.quantX - 1,
        down() {
            if (this.py + 1 < game.quantY) {
                return this.py += 1
            }
            return this.py = this.py - game.quantY + 1
        },
        right() {
            if (this.px + 1 < game.quantX) {
                return this.px += 1
            }
            return this.px = this.px - game.quantX + 1
        }
    }

    async move() {
        if (this.direction === null) return

        this.tail.push({ px: this.px, py: this.py })
        this.last = snake.tail.shift()

        this.moves[this.direction]?.()
    }

    bindMoves() {
        for (const move in this.moves) {
            this.moves[move] = this.moves[move].bind(this)
        }
    }

    constructor() {
        this.setDefaultValues()
        this.bindMoves()
    }

    setDefaultValues() {
        this.py = 11
        this.px = 10
        this.direction = "right"
        this.last = null
        this.moveLock = false
        this.tail = [
            {
                py: 11,
                px: 7
            },
            {
                py: 11,
                px: 8
            },
            {
                py: 11,
                px: 9
            }
        ]
    }

    setDirection(direction) {
        if (this.direction === direction || this.moveLock) {
            return
        }

        if (
            (this.direction === "right" && direction !== "left") ||
            (this.direction === "left" && direction !== "right") ||
            (this.direction === "up" && direction !== "down") ||
            (this.direction === "down" && direction !== "up")
        ) {
            this.direction = direction
            this.moveLock = true
        }
    }

    reset() {
        this.setDefaultValues()
    }

    get length() {
        return this.tail.length + 1
    }
}

const snake = new Snake()

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

const move = async () => {
    snake.move()
}

export { snake, moves, move }