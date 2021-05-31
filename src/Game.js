import { getDefaultGame } from "./Settings.js"
import { mainKeyDown, render } from "../index.js"
import viewPause from "./telas/Pause.js"

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

export { game, setConfig, setGameSettings, pause }