const jwt = require('jsonwebtoken');

const generateJWT = async (id, nombre, correo, clave, estado) => {

    return new Promise((resolve, reject) => {
        jwt.sign({ id, nombre, correo, clave, estado }, process.env.SECRET_KEY, { expiresIn: "10m" }, (error, token) => {
            if (error) reject("Error al generar el token")

            resolve(token)
        })
    })

}

module.exports = generateJWT