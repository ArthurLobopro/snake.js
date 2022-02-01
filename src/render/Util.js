const path = require('path')

const loadImage = async (...pathSegments) => {
    const image = new Image()
    image.src = path.resolve(...pathSegments)
    return new Promise(res => {
        image.onload = () => {
            res(image)
        }
    })
}

const randint = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export { loadImage, randint }