const getDefaultSnake = async ()=> {
    let { snake } = 
    await fetch("./settings/default.json")
    .then( data => {
        return data.json()
    })
    return snake
}

const getDefaultGame = async () => {
    let { game } = 
    await fetch("./settings/default.json")
    .then( data => {
        return data.json()
    })
    return game
}

const getDefaultColors = async () => {
    let { colors } = 
    await fetch("./settings/default.json")
    .then( data => {
        return data.json()
    })
    return colors
}

export { getDefaultSnake, getDefaultGame, getDefaultColors }