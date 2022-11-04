import { PauseScreen } from "./Screens/Pause.js"
import { GameOverScreen } from "./Screens/GameOver.js"
import { ConfigScreen } from "./Screens/Config.js"
import { InitScreen } from "./Screens/Init.js"
import { ColorsScreen } from "./Screens/Config/Colors.js"
import { VelocityScreen } from "./Screens/Config/Velocity.js"
import { GameScreen } from "./Screens/GameScreen.js"

export const screens = {
    pause: new PauseScreen(),
    gameOver: new GameOverScreen(),
    config: new ConfigScreen(),
    init: new InitScreen(),
    gameScreen: new GameScreen(),

    config_screens: {
        colors: new ColorsScreen(),
        velocity: new VelocityScreen()
    }
}

export const game_screen_components = screens.gameScreen.components