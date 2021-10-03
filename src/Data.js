const oldGetData = async () => {
    if (!localStorage.gameData) {
        createData()
    }
    let { recorde, velocidade, colors } = await JSON.parse(localStorage.gameData)
    recorde = recorde ?? 0
    velocidade = velocidade ?? 200
    return { recorde, velocidade, colors }
}

const getData = () => {
    const data = gameApi.getData()
    const preferences = gameApi.getPreferences()
    return { ...data, ...preferences }
}

const saveRecorde = recorde => {
    gameApi.saveData({ recorde })
}

const saveVelocidade = velocidade => {
    gameApi.savePreferences({ velocidade })
}

const saveColors = colors => {
    gameApi.saveColors(colors)
}

const getColors = () => gameApi.getColors()

//Código temporário para migração de dados
const convertData = async () => {
    const gameData = Object.entries(await oldGetData())

    gameData.forEach(([key, value]) => {
        gameApi.saveData(key, value)
    })

    localStorage.removeItem('gameData')

}

if (localStorage.getItem('gameData') && window.gameApi) {
    window.addEventListener('load', convertData)
}

export { saveRecorde, getData, saveVelocidade, saveColors, getColors }