const canvas = document.getElementById('game')
const ctx = canvas.getContext("2d")

const colors = {
    background: "#303030",
    snake: "#DDDDDD"
}

const game = {
    width: canvas.width,
    height: canvas.height
}

const snake = {
    py: 150,
    px: 150,
    width: 15,
    height: 15
}

const drawBackground = () => {
    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, game.width, game.height)
}

const drawSnake = () => {
    ctx.fillStyle = colors.snake
    ctx.fillRect(snake.px , snake.py, snake.width, snake.height)
}

drawBackground()
drawSnake()

