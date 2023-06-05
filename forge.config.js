const path = require("path")
const { execSync } = require("child_process")
const package = require("./package.json")

const { version } = package

const isLinux = process.platform === "linux"

module.exports = {
    packagerConfig: {
        icon: isLinux ? "./build/icon32.png" : "./build/icon.ico",
        ignore: [
            "\\.git",
            "build/",
            "\\.scss"
        ]
    },
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                name: "snake.js",
                setupExe: `snake.js-${version}-setup.exe`,
                setupIcon: "./build/icon32.ico",
                iconUrl: "https://raw.githubusercontent.com/ArthurLobopro/snake.js/main/build/icon32.ico",
                loadingGif: "./build/snake.gif"
            }
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: [
                "darwin"
            ]
        },
        {
            name: "@electron-forge/maker-deb",
            config: {
                name: "snake",
                productName: "Snake.js",
                genericName: "Snake.js",
                description: "Jogo da cobrinha feito em JavaScript",
                icon: path.join(__dirname, "./build/icon32.png"),
                categories: ["Game"],
                options: {
                    maintainer: "Arthur Lobo",
                    homepage: "https://github.com/ArthurLobopro/snake.js"
                }
            },
            platforms: [
                "linux"
            ]
        },
        {
            name: "@electron-forge/maker-rpm",
            config: {},
            platforms: []
        }
    ],
    publishers: [
        {
            name: "@electron-forge/publisher-github",
            config: {
                repository: {
                    owner: "ArthurLobopro",
                    name: "snake.js"
                },
                draft: true,
                prerelease: false
            }
        }
    ],
    hooks: {
        async generateAssets() {
            return new Promise(async (resolve, reject) => {
                try {
                    console.log("Compiling SASS...")
                    execSync("yarn sass-compiler --compile")
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
}