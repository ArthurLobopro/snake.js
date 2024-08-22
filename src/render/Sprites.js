import { loadImage } from "./Util.js"

const appPath = window.appPath

export const sprites = {
    lang: {
        up: await loadImage(appPath, "assets/lingua/lingua-up.png"),
        down: await loadImage(appPath, "assets/lingua/lingua-down.png"),
        left: await loadImage(appPath, "assets/lingua/lingua-left.png"),
        right: await loadImage(appPath, "assets/lingua/lingua-right.png"),
    },
    fruits: {
        laranja: await loadImage(appPath, "assets/frutas/laranja.png"),
        maca: await loadImage(appPath, "assets/frutas/maca.png"),
        cereja: await loadImage(appPath, "assets/frutas/cereja.png"),
        coco: await loadImage(appPath, "assets/frutas/coco.png"),
    },
}
