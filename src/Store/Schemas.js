const colorType = {
    type: "string",
    minLength: 4
}

const colorsSchema = {
    default: {
        type: "object",
        properties: {
            background: {
                ...colorType,
                readOnly: true
            },
            snake: {
                ...colorType,
                readOnly: true
            },
            snake_tail: {
                ...colorType,
                readOnly: true
            }
        },
        default: {
            background: "#141414",
            snake: "#4AA96C",
            snake_tail: "#9FE6A0"
        }
    },
    colors: {
        type: "object",
        properties: {
            background: {
                ...colorType,
                default: "#141414"
            },
            snake: {
                ...colorType,
                default: "#4AA96C"
            },
            snake_tail: {
                ...colorType,
                default: "#9FE6A0"
            }
        },
        default: {
            background: "#141414",
            snake: "#4AA96C",
            snake_tail: "#9FE6A0"
        }
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
    velocity: {
        enum: [100, 200, 300],
        default: 200
    }
}

module.exports = { colorsSchema, dataSchema, preferencesSchema }
