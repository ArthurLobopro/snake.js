const colorType = {
    type: "string",
    minLength: 4
}

const colorsSchema = {
    background: {
        ...colorType,
        default: "#141414"
    },
    snake: {
        ...colorType,
        default: "#4AA96C"
    },
    cauda_snake: {
        ...colorType,
        default: "#9FE6A0"
    }
}

const dataSchema = {
    recorde: {
        type: "number",
        minimum: 0,
        default: 0
    }
}

const preferencesSchema = {
    velocidade: {
        enum: [100, 200, 300],
        default: 200,

    }
}

module.exports = { colorsSchema, dataSchema, preferencesSchema }
