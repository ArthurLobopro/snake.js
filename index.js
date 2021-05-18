const canvas = document.getElementById('game')
const ctx = canvas.getContext("2d")

const colors = {
    background: "#303030",
    snake: "#4AA96C"
}

const buttons = {
    "ArrowLeft": () => snake.setDirecao("left"),
    "ArrowDown": () => snake.setDirecao("down"),
    "ArrowRight": () => snake.setDirecao("right"),
    "ArrowUp": () => snake.setDirecao("up"),
    "w": () => snake.setDirecao("up"),
    "a": () => snake.setDirecao("left"),
    "s": () => snake.setDirecao("down"),
    "d": () => snake.setDirecao("right")
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
    direcao: null,
    setDirecao(direcao){
        if(this.direcao === direcao) return
        if(this.direcao === null) this.direcao = direcao

        if(this.direcao === "right"){
            if(direcao !== "left")
                this.direcao = direcao
        }

        if(this.direcao === "left"){
            if(direcao !== "right")
                this.direcao = direcao
        }

        if(this.direcao === "up"){
            if(direcao !== "down")
                this.direcao = direcao
        }

        if(this.direcao === "down"){
            if(direcao !== "up")
                this.direcao = direcao
        }
    }
}

const move = () => {
    const { direcao, width } = snake
    
    switch(direcao){
        case "up":
            return snake.py = (snake.py - width) >= 0 ? snake.py - width : game.height - width
        case "down":
            if(snake.py + width < game.height){
                return snake.py += width
            }
            return snake.py = snake.py - game.height + 15
        case "left":
            return snake.px = (snake.px - width) >= 0 ? snake.px - width : game.width - width
        case "right":
            if(snake.px + width < game.width){
                return snake.px += width
            }
            return snake.px = snake.px - game.width + 15
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
            setInterval( render, 300)
        }
    }else{
        buttons[key]?.()
    }
    console.log(snake);
}

window.onload = render