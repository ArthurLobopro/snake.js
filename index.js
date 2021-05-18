const canvas = document.getElementById('game')
const ctx = canvas.getContext("2d")

const colors = {
    background: "#303030",
    snake: "#4AA96C"
}

const buttons = {
    "ArrowLeft": () => snake.direcao = "left",
    "ArrowDown": () => snake.direcao = "down",
    "ArrowRight": () => snake.direcao = "right",
    "ArrowUp": () => snake.direcao = "up",
    "w": () => snake.direcao = "up",
    "a": () => snake.direcao = "left",
    "s": () => snake.direcao = "down",
    "d": () => snake.direcao = "right"
}

const game = {
    width: canvas.width,
    height: canvas.height,
    status: "inative"
}

const snake = {
    py: 150,
    px: 150,
    width: 15,
    direcao: null
}

const move = () => {
    const { direcao, width } = snake

    switch(direcao){
        case "up":
            return snake.py -= width
        case "down":
            return snake.py += width
        case "left":
            return snake.px -= width
        case "right":
            return snake.px += width
    }
}

const drawBackground = () => {
    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, game.width, game.height)
}

const drawSnake = () => {
    const { px, py, width } = snake
    ctx.fillStyle = colors.snake
    ctx.fillRect(px , py, width, width)
}

const render = () => {
    move()
    drawBackground()
    drawSnake()
}

window.onkeydown = event => {
    const key = event.key.lenght == 1 ? event.key.toLowerCase() : event.key
    if(game.status === "inative"){
        if(buttons[key]){
            game.status = "active"
            buttons[key]()
            setInterval( render, 500)
        }
    }else{
        buttons[key]?.()
    }
    console.log(snake);
}

window.onload = render