import { drawBackground, drawFruit, drawLingua, drawSnake } from "./src/View.js"
import { getData } from "./src/Data.js"
import { snake, setSnakeSettings, moves } from "./src/Snake.js"
import { 
    game, setGameSettings, pause, gameOver
} from "./src/Game.js"

const get = id => document.getElementById(id)

const recordDiv = get('recorde')

const comands = {
    "Escape": pause,
}

const randItem = arr => {
    const randint = (min,max) => Math.floor(Math.random() * (max-min+1)) + min
    return arr[randint(0,arr.length - 1)]
}

const move = async () => {
    const { direcao } = snake
    const { quantX, quantY } = game
    
    if(direcao !== null){
        snake.cauda.push( {px: snake.px, py: snake.py})
        snake.ultima = snake.cauda.shift()
    }

    if(direcao === "up"){
        return snake.py = (snake.py - 1) >= 0 ? snake.py - 1 : quantY - 1
    }
    if(direcao === "left"){
        return snake.px = (snake.px - 1) >= 0 ? snake.px - 1 : quantX - 1
    }

    if(direcao === "down"){
        if(snake.py + 1 < quantY){
            return snake.py += 1
        }
        return snake.py = snake.py - quantY + 1
    }

    if(direcao === "right"){
        if(snake.px + 1 < quantX){
            return snake.px += 1
        }
        return snake.px = snake.px - quantX + 1
    }
}

const spawFruit = async () => {
    const randint = (min,max) => Math.floor(Math.random() * (max-min+1)) + min
    const { quantX, quantY } = game
    const { type, value } = randItem(game.frutas)
    while (true) {
        const px = randint(0, quantX - 1)
        const py = randint(0, quantY - 1)
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
                game.fruit = { 
                    px, py ,
                    type, value
                }
                return
            }
        }
    }
}

const colisao = async () => {
    const { px , py, cauda } = snake

    if(game.fruit.px === px && game.fruit.py === py){
        game.pontos += game.fruit.value
        await spawFruit()
        snake.cauda.unshift(snake.ultima)
    }

    return new Promise( resolve => {
        cauda.forEach( q => {
            if(q.px === px && q.py === py){
                resolve(true)
                gameOver()
            }
        })
        resolve(false)
    })
}

const render = async () => {
    if(!await colisao()){
        await move()
    }

    drawBackground(game)
    drawFruit(game)
    drawSnake(snake, game)
    drawLingua(snake)
    
    snake.moveLock = false
    get("pontos").innerText = game.pontos
}

const mainKeyDown = event => {
    const key = event.key.lenght == 1 ? event.key.toLowerCase() : event.key
    if(game.status === "inative"){
        if(moves[key]){
            game.status = "active"
            moves[key]()
            game.interval = setInterval( render, game.velocidade)
        }
    }else{
        moves[key]?.()
        comands[key]?.()
    }
}

window.onkeydown = mainKeyDown

window.onload = async () => {
    await setGameSettings()
    const data = Object.entries(await getData())
    data.forEach( ([key, value]) => {
        game[key]= value
    })
    await setSnakeSettings()
    render()
    recordDiv.innerText = game.recorde
}

export { mainKeyDown, render, get }