const Store = require('electron-store')
const { colorsSchema, preferencesSchema, dataSchema } = require("./Schemas")

const storeFolderName = "data"

const colors = new Store({
    cwd: storeFolderName,
    name: "colors",
    schema: colorsSchema,
    migrations: {
        "1.5.0": store => {
            if (store.has("background") || store.has("snake") || store.has("cauda_snake")) {
                const oldColors = store.store
                delete oldColors.colors
                delete oldColors.default
                

                if(oldColors.cauda_snake){
                    oldColors.snake_tail = oldColors.cauda_snake
                    delete oldColors.cauda_snake
                }

                store.clear()
                
                store.set("colors", {...store.store.colors ,...oldColors})
            }
        }
    }
})

const preferences = new Store({
    cwd: storeFolderName,
    name: "preferences",
    schema: preferencesSchema,
    migrations: {
        "1.5.0": store => {
            if(store.has("velocidade")){
                const velocity_saved = store.store.velocidade
                store.clear()
                store.set("velocity", velocity_saved)
            }
        }
    }
})

const data = new Store({
    cwd: storeFolderName,
    name: "data",
    schema: dataSchema
})

module.exports = { colors, data, preferences }