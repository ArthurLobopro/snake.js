const oldGetData = async () => {
    if(!localStorage.gameData){
        createData()
    }
    let { recorde, velocidade, colors } = await JSON.parse(localStorage.gameData)
    recorde = recorde ?? 0
    velocidade = velocidade ?? 200
    return  {recorde, velocidade, colors} 
}

const getData = () => {
    const recorde = gameApi.getData('recorde') ?? 0
    const velocidade = gameApi.getData('velocidade') ?? 200
    const colors = gameApi.getData('colors')
    return  { recorde, velocidade, colors }
}

const saveRecorde = recorde => {
    gameApi.saveData( 'recorde', recorde )
}

const saveVelocidade = velocidade => {
    gameApi.saveData( 'velocidade', velocidade )
}

const saveColors = colors => {
    gameApi.saveData( 'colors', colors )
}

//Código temporário para migração de dados
const convertData = async () => {
    const gameData = Object.entries(await oldGetData())
    
    gameData.forEach( ([key,value]) => {
        gameApi.saveData( key, value )
    })

    localStorage.removeItem('gameData')

}

if(localStorage.getItem('gameData')){
    console.log('teste');
    window.addEventListener('load', convertData)
}

export { saveRecorde, getData, saveVelocidade, saveColors }