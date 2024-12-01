const getButtons = (element) => {
    const buttons = element.querySelectorAll("button")
    const focused = element.querySelector("button.focus")
    return { buttons, focused }
}

const functions = {
    up(element) {
        const { buttons, focused } = getButtons(element)
        let previus = focused.previousElementSibling
        if (previus?.tagName !== "BUTTON") {
            previus = buttons[buttons.length - 1]
        }
        focused.classList.remove("focus")
        previus.classList.add("focus")
    },
    down(element) {
        const { buttons, focused } = getButtons(element)
        let next = focused.nextElementSibling
        if (!next || next?.tagName !== "BUTTON" || next === focused) {
            console.log("hey")
            next = buttons[0]
        }
        focused.classList.remove("focus")
        next.classList.add("focus")
    },
    select(element) {
        const { focused } = getButtons(element)
        focused.click()
    },
}

const keys = {
    ArrowUp: functions.up,
    w: functions.up,
    ArrowDown: functions.down,
    s: functions.down,
    Enter: functions.select,
}

export default keys
