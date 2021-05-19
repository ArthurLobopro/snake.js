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
    unity: 15,
    quantX: 21,
    quantY: 21,
    fruit:{
        py: 11,
        px: 10 + 5,
    },
    interval: null
}

const snake = {
    py: 11,
    px: 10,
    direcao: null,
    ultima: null,
    cauda: [
        {
            py: 11,
            px: 10 - 3,
        },
        {
            py: 11,
            px: 10 - 2,
        },
        {
            py: 11,
            px: 10 - 1,
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
    const { direcao } = snake
    const { quantX, quantY } = game
    
    if(direcao !== null){
        snake.cauda.push( {px: snake.px, py: snake.py})
        snake.ultima = snake.cauda.shift()
    }

    switch(direcao){
        case "up":
            return snake.py = (snake.py - 1) >= 0 ? snake.py - 1 : quantY - 1
        case "down":
            if(snake.py + 1 < quantY){
                return snake.py += 1
            }
            return snake.py = snake.py - quantY + 1
        case "left":
            return snake.px = (snake.px - 1) >= 0 ? snake.px - 1 : quantX - 1
        case "right":
            if(snake.px + 1 < quantX){
                return snake.px += 1
            }
            return snake.px = snake.px - quantX + 1
    }
}

const drawBackground = () => {
    ctx.fillStyle = colors.background
    ctx.fillRect(0, 0, game.width, game.height)
}

const drawFruit = () => {
    const { py, px } = game.fruit
    const { unity } = game
    ctx.fillStyle = colors.red_fruit
    ctx.fillRect(px * unity, py * unity, unity, unity)
}

const drawSnake = () => {
    const { px, py, cauda } = snake
    const { unity } = game
    ctx.fillStyle = colors.snake
    ctx.fillRect(px * unity, py * unity, unity, unity)

    cauda.forEach( ({py,px}) => {
        ctx.fillStyle = colors.cauda_snake
        ctx.fillRect(px * unity, py * unity, unity, unity)
    })
}

const spawFruit = async () => {
    const randint = (min,max) => Math.floor(Math.random() * (max-min+1)) + min
    const { quantX, quantY } = game
    while (true) {
        const px = randint(0, quantX)
        const py = randint(0, quantY)
        if(snake.px !== px && snake.py !== py){
            const { cauda } = snake
            let find = cauda.map( q => {
                if(q.px === px && q.py === py){
                    return 't'
                }
                return 'f'
            } )
            find = find.join('')
            if(find.indexOf('t') === -1){
                game.fruit.px = px
                game.fruit.py = py
                break
            }
        }
    }
}

const colisao = async () => {
    const { px , py, cauda } = snake
    if(game.fruit.px === px && game.fruit.py === py){
        await spawFruit()
        snake.cauda.unshift(snake.ultima)
    }
    cauda.forEach( q => {
        if(q.px === px && q.py === py){
            //clearInterval(game.interval)
        }
    })
}

const render = async () => {
    await colisao()
    move()
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
            game.interval = setInterval( render, 200)
        }
    }else{
        buttons[key]?.()
    }
}

window.onload = render