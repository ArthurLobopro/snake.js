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

export default functions