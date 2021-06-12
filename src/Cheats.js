import { game } from "./Game.js"
import alert from "./browser-functions/alert.js"

const keys = []
let timeout = null

const clean = () => {
    while(keys.length != 0){
        keys.shift()
    }
    console.log(keys);
}

const cheats = {
    python(){
        game.imortal = true
        game.canSaveRecord = false
        alert({title: "Imortalidade Ativada",text: "Sua pontuação não será mais contabilizada, para desativar o modo imortal pause e inicie um novo jogo."})
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