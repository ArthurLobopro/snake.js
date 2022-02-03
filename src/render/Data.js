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

export { saveRecorde, getData, saveVelocidade, saveColors, getColors }