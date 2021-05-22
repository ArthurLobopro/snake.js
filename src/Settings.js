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

export { getDefaultSnake, getDefaultGame }