import { getDefaultGame } from "./Settings.js"

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

export { game, setConfig, setGameSettings }