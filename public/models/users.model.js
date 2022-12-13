const {Schema, model} = require("mongoose")

const schema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        correo: {
            type: String,
            unique: true,
            required: true,
        },
        telefono: {
            type: String,
            required: false,
        },
        fecha: {
            type: Date,
            default: new Date(),
        },
        clave: {
            type: String,
            required: true,
        },
        estado: {
            type: Boolean,
            default: true,
        }
    }
)

module.exports = model("users", schema)