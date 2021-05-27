const get = id => document.getElementById(id)
const gameDiv = get('game')
const tela = get('tela')

const getButtons = fieldset => {
    const buttons = fieldset.querySelectorAll('button')
    const focused = fieldset.querySelector('button.focus')
    return { buttons, focused }
}

const functions = {
    "ArrowUp": fieldset => {
        const { buttons, focused } = getButtons(fieldset)
        let previus = focused.previousElementSibling
        if(previus.tagName !== "BUTTON"){
            previus = buttons[buttons.length - 1]
        }
        focused.classList.remove('focus')
        previus.classList.add('focus')
    },
    "ArrowDown": fieldset => {
        const { buttons, focused } = getButtons(fieldset)
        let next = focused.nextElementSibling
        if(next.tagName !== "BUTTON"){
            next = buttons[0]
        }
        focused.classList.remove('focus')
        next.classList.add('focus')
    },
    "Enter": fieldset => {
        const { focused } = getButtons(fieldset)
        focused.click()
    }
}

export default function viewPause({play, newGame}) {
    const fieldset = document.createElement('fieldset')
    fieldset.innerHTML = `
    <legend>Pause</legend>
    <button id="continue" class="focus">CONTINUE</button>
    <button id="new-game">NEW GAME</button>`
    tela.insertBefore(fieldset, gameDiv)
    get('continue').onclick = () => {
        tela.removeChild(fieldset)
        setTimeout( play, 150)
    }
    get('new-game').onclick = () => {
        tela.removeChild(fieldset)
        setTimeout( newGame, 150)
    }
    window.onkeydown = event => functions[event.key]?.(fieldset)
}