import { game } from "./Game.js"
import Alert from "./Screens/Alert.js"

const keys = []
let timeout = null

const clean = () => {
    while(keys.length != 0){
        keys.shift()
    }
}

const cheats = {
    python(){
        game.imortal = true
        game.canSaveRecord = false
        const alert = new Alert({
            title: "Imortalidade Ativada",
            text: "Sua pontuação não será mais contabilizada como recorde, para desativar o modo imortal pause e inicie um novo jogo."
        })
        alert.show()
    }
}

const loadCheat = event => {
    keys.push(event.key)
    const string = keys.join('').toLowerCase()
    Object.entries(cheats).forEach( ([key,call]) => {
        if(string.search(key) !== -1){
            call()
            clean()
        }
    })
    clearTimeout(timeout)
    timeout = setTimeout(clean, 3000);
} 

export { loadCheat }