const getDefaultSnake = async ()=> {
    let { snake } = 
    await fetch("../settings/default.json")
    .then( data => {
        return data.json()
    })
    return snake
}

const getDefaultColors = async () => {
    let { colors } = 
    await fetch("../settings/default.json")
    .then( data => {
        return data.json()
    })
    return colors
}

export { getDefaultSnake, getDefaultColors }