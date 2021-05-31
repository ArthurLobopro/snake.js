import { getDefaultSnake } from "./Settings.js"

const snake = {
    setDirecao(direcao){
        if(this.direcao === direcao) return
        if(this.moveLock) return

        if(this.direcao === "right"){
            if(direcao !== "left")
                this.direcao = direcao
        }

        if(this.direcao === "left"){
            if(direcao !== "right")
                this.direcao = direcao
        }

        if(this.direcao === "up"){
            if(direcao !== "down")
                this.direcao = direcao
        }

        if(this.direcao === "down"){
            if(direcao !== "up")
                this.direcao = direcao
        }
        this.moveLock = true
    }
}

const setSnakeSettings = async ()=> {
    let settings = await getDefaultSnake()
    settings = Object.entries(settings)
    settings.forEach( s => snake[s[0]] = s[1])
}

export { snake, setSnakeSettings }