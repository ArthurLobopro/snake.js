import { Screen } from "./Screen.js"

export class ControlsScreen extends Screen {
    constructor() {
        super()
        this.reset()
    }

    buildFunction() {
        const constrols_screen = document.createElement("div")
        constrols_screen.className = "screen-wrapper"
        constrols_screen.innerHTML = `
            <div class="telas-wrapper">
                <fieldset id="controls">
                    <legend>CONTROLES</legend>
                    <div class="line">
                        Muda a direção da cobra para esquerda.
                        <div class="flex-center gap">
                            <div class="key">A</div>
                            <span>ou</span>
                            <div class="key">&LeftArrow;</div>
                        </div>
                    </div>
                    <div class="line">
                        Muda a direção da cobra para direita.
                        <div class="flex-center gap">
                            <div class="key">D</div>
                            <span>ou</span>
                            <div class="key">&RightArrow;</div>
                        </div>
                    </div>
                    <div class="line">
                        Muda a direção da cobra para cima.
                        <div class="flex-center gap">
                            <div class="key">W</div>
                            <span>ou</span>
                            <div class="key">&UpArrow;</div>
                        </div>
                    </div>
                    <div class="line">
                        Muda a direção da cobra para baixo.
                        <div class="flex-center gap">
                            <div class="key">S</div>
                            <span>ou</span>
                            <div class="key">&DownArrow;</div>
                        </div>
                    </div>
                    <div class="line">
                        Pausa o jogo
                        <div class="key">Esc</div>
                    </div>
                    <div class="center-line">
                        <button class="focus">Voltar</button>
                    </div>
                </fieldset>
            </div>`

        constrols_screen.querySelector("button").onclick = () => {
            this.close()
        }

        return constrols_screen
    }

    close() {
        super.close()
        this.afterScreen.show()
    }

    show(afterScreen) {
        super.show(true)
        this.afterScreen = afterScreen
    }
}
