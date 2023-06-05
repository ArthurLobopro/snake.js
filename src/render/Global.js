import { Game } from "./Game.js"
import { Drawer } from "./View.js"

export const game = new Game()
export const draw = new Drawer(game)