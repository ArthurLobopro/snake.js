import { game } from "./Global.js"

class Snake {
    constructor() {
        this.setDefaultValues()
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
                px: 7,
            },
            {
                py: 11,
                px: 8,
            },
            {
                py: 11,
                px: 9,
            },
        ]
    }

    moves = {
        up() {
            this.py = this.py - 1 >= 0 ? this.py - 1 : game.quantY - 1
        },
        left() {
            this.px = this.px - 1 >= 0 ? this.px - 1 : game.quantX - 1
        },
        down() {
            if (this.py + 1 < game.quantY) {
                this.py += 1
                return
            }

            this.py = this.py - game.quantY + 1
        },
        right() {
            if (this.px + 1 < game.quantX) {
                this.px += 1
                return
            }

            this.px = this.px - game.quantX + 1
        },
    }

    async move() {
        if (this.direction === null) return

        this.tail.push({ px: this.px, py: this.py })
        this.last = snake.tail.shift()

        this.moves[this.direction]?.call(this)
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

export const snake = new Snake()
