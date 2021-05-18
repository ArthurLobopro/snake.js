const canvas = document.getElementById('game')
const ctx = canvas.getContext("2d")

const colors = {
    background: "#303030",
    snake: "#4AA96C",
    cauda_snake: "#9FE6A0",
    red_fruit: "#f55c47"
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
    status: "inative",
    fruit:{
        py: 150,
        px: 120 + 75,
    },
}

const snake = {
    py: 150,
    px: 120,
    width: 15,
    direcao: null,
    cauda: [
        {
            py: 150,
            px: 120 - 45,
        },
        {
            py: 150,
            px: 120 - 30,
        },
        {
            py: 150,
            px: 120 - 15,
        }
    ],
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
    
    if(direcao !== null){
        snake.cauda.push( {px: snake.px, py: snake.py})
        snake.cauda.shift()
    }

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

const drawFruit = () => {
    const { py, px } = game.fruit
    ctx.fillStyle = colors.red_fruit
    ctx.fillRect(px, py, snake.width, snake.width)
}

const drawSnake = () => {
    const { px, py, width, cauda } = snake
    ctx.fillStyle = colors.snake
    ctx.fillRect(px , py, width, width)

    cauda.forEach( ({py,px}) => {
        ctx.fillStyle = colors.cauda_snake
        ctx.fillRect(px , py, width, width)
    })
}

const spawFruit = () => {
    const randint = (min,max) => Math.floor(Math.random() * (max-min+1)) + min
    const limite = game.width/snake.width
    let px = randint(0, limite) * snake.width
    let py = randint(0, limite) * snake.width
    if(snake.px !== px && snake.py !== py){
        const { cauda } = snake
        let find = cauda.some( q => {
            if(q.px === px && q.py === py){
                return true
            }
            return false
        } )
        if(!find){
            game.fruit = {px, py}
        }
    }
    
}

const colisao = () => {
    const { px , py } = snake
    if(game.fruit.px === px && game.fruit.py === py){
        spawFruit()
    }
}

const render = () => {
    move()
    colisao()
    drawBackground()
    drawFruit()
    drawSnake()
}

window.onkeydown = event => {
    const key = event.key.lenght == 1 ? event.key.toLowerCase() : event.key
    if(game.status === "inative"){
        if(buttons[key]){
            game.status = "active"
            buttons[key]()
            setInterval( render, 200)
        }
    }else{
        buttons[key]?.()
    }
    console.log(snake);
}

window.onload = render