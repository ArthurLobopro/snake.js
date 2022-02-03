const getDefaultColors = async () => {
    let { colors } = 
    await fetch("../settings/default.json")
    .then( data => {
        return data.json()
    })
    return colors
}

export { getDefaultColors }