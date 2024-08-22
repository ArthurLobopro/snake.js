import { ConfigScreen } from "./Screens/Config.js"
import { ColorsScreen } from "./Screens/Config/Colors.js"
import { VelocityScreen } from "./Screens/Config/Velocity.js"
import { ControlsScreen } from "./Screens/Controls.js"
import { GameOverScreen } from "./Screens/GameOver.js"
import { GameScreen } from "./Screens/GameScreen.js"
import { InitScreen } from "./Screens/Init.js"
import { PauseScreen } from "./Screens/Pause.js"

export const screens = {
    pause: new PauseScreen(),
    gameOver: new GameOverScreen(),
    config: new ConfigScreen(),
    init: new InitScreen(),
    gameScreen: new GameScreen(),
    controls: new ControlsScreen(),
    config_screens: {
        colors: new ColorsScreen(),
        velocity: new VelocityScreen(),
    },
}

export const game_screen_components = screens.gameScreen.components
