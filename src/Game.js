import { getDefaultGame } from "./Settings.js"
import { mainKeyDown, render } from "../index.js"
import { saveRecorde } from "./Data.js"
import viewPause from "./telas/Pause.js"
import viewGameOver from "./telas/GameOver.js"
import { setSnakeSettings, snake } from "./Snake.js"

const get = id => document.getElementById(id)

const canvas = get('canvas')

const game = {
    width: canvas.width,
    height: canvas.height,
    status: "inative",
    unity: 15,
    quantX: 21,
    quantY: 21,
    interval: null
}

const setGameSettings = async () => {
    let settings = await getDefaultGame()
    settings = Object.entries(settings)
    settings.forEach( s => game[s[0]] = s[1])
}

const setConfig = (key,value) =>{
    game[key]=value
}

const randItem = arr => {
    const randint = (min,max) => Math.floor(Math.random() * (max-min+1)) + min
    return arr[randint(0,arr.length - 1)]
}

const play = () => {
    if(game.status === "paused"){
        window.onkeydown = mainKeyDown
        game.status = "active"
        game.interval = setInterval(render, game.velocidade)
    }
}

const pause = ()=> {
    if(game.status === "active"){
        game.status = "paused"
        clearInterval(game.interval)
        viewPause({ play, newGame })
    }
}

const newGame = async () => {
    window.onkeydown = mainKeyDown
    await setSnakeSettings()
    await setGameSettings()
    get("pontos").innerText = game.pontos
    render()
}

const gameOver = async () => {
    clearInterval(game.interval)
    get('game').style.display = "none"
    if(game.pontos > game.recorde){
        game.recorde = game.pontos
        saveRecorde(game.recorde)
        recordDiv.innerText = game.recorde
    }
    await viewGameOver({pontos: game.pontos, recorde: game.recorde, img: canvas.toDataURL('image/png')})
    await newGame()
    get('game').style.display = ""
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

export { game, setConfig, setGameSettings, pause, newGame, gameOver, spawFruit }