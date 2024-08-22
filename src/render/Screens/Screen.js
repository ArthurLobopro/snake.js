import navigation from "./navigation.js"

const container = document.getElementById("container")

export class Screen {
    buildFunction() {}

    addNavigation() {
        window.onkeydown = (event) => navigation[event.key]?.(this.screen)
    }

    removeNavigation() {
        window.onkeydown = null
    }

    reset() {
        this.screen = this.buildFunction()
    }

    show(navigation = true) {
        container.appendChild(this.screen)
        if (navigation) {
            this.addNavigation()
        }
    }

    hide() {
        container.removeChild(this.screen)
    }

    close() {
        this.hide()
        this.reset()
    }
}

export class ConfigScreenBase extends Screen {
    show() {
        this.reset()
        super.show(false)
    }
}
