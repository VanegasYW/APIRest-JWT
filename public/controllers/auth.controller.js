const User = require('../models/users.model');
const bcryptjs = require('bcryptjs');
const generateJWT = require("../helpers/generateJWT")

const userAuthentication = async (req, res) => {
    try {
        const { nombre, clave } = req.body

        const user = await User.findOne({ nombre })

        if (!user) return res.json({
            "ok": 200,
            "msg": "El usuario no existe"
        })

        const compareClave = bcryptjs.compareSync(clave, user.clave)

        if (!compareClave) return res.json({
            "ok": 200,
            "msg": "La clave no coincide"
        })

        const token = await generateJWT(user.nombre, user.correo, user.clave, user.estado)

        res.json({
            "ok": 200,
            "msg": "Token creado",
            token
        })
    } catch (error) {
        res.status(500).json({
            "ok": 500,
            "msg": "Error de la página"
        })
    }
}

module.exports = userAuthentication