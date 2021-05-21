const getData = async () => {
    if(!localStorage.gameData){
        createData()
    }
    let { recorde } = await JSON.parse(localStorage.gameData)
    recorde = recorde ?? 0
    return  recorde 
}

const saveRecorde = recorde => {
    const gameData = JSON.parse(localStorage.gameData)
    gameData.recorde = recorde
    localStorage.gameData = JSON.stringify(gameData)
}

const createData = () => {
    let data = {
        recorde: 0
    }
    localStorage.gameData = JSON.stringify(data)
}

export { saveRecorde, getData }