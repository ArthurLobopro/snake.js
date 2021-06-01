const getData = async () => {
    if(!localStorage.gameData){
        createData()
    }
    let { recorde, velocidade, colors } = await JSON.parse(localStorage.gameData)
    recorde = recorde ?? 0
    velocidade = velocidade ?? 200
    return  {recorde, velocidade, colors} 
}

const saveRecorde = recorde => {
    const gameData = JSON.parse(localStorage.gameData)
    gameData.recorde = recorde
    localStorage.gameData = JSON.stringify(gameData)
}

const saveVelocidade = velocidade => {
    const gameData = JSON.parse(localStorage.gameData)
    gameData.velocidade = velocidade
    localStorage.gameData = JSON.stringify(gameData)
}

const saveColors = colors => {
    const gameData = JSON.parse(localStorage.gameData)
    gameData.colors = colors
    localStorage.gameData = JSON.stringify(gameData)
}

const createData = () => {
    let data = {
        recorde: 0,
        velocidade:200
    }
    localStorage.gameData = JSON.stringify(data)
}

export { saveRecorde, getData, saveVelocidade, saveColors }