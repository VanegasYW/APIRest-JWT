const {Schema, model} = require("mongoose")

const UserSchema  = new Schema(
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

module.exports = model("User", UserSchema )