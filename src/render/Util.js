const path = require("node:path")

export const loadImage = async (...pathSegments) => {
    const image = new Image()
    image.src = path.resolve(...pathSegments)
    return new Promise((res) => {
        image.onload = () => {
            res(image)
        }
    })
}

export function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randItem(arr) {
    return arr[randint(0, arr.length - 1)]
}

export function $(q, c = document) {
    return c.querySelector(q)
}

export function $$(q, c = document) {
    return Array.from(c.querySelectorAll(q))
}
