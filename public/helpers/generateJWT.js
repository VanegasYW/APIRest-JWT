const jwt = require('jsonwebtoken');

const generateJWT = async (id, nombre, correo) => {

    // Return a new promise that handles the JWT generation
    return new Promise((resolve, reject) => {
        // Pass in the payload (id, nombre, correo), the secret key and set the expiration time to 10 minutes
        jwt.sign({ id, nombre, correo }, process.env.SECRET_KEY, { expiresIn: "10m" }, (error, token) => {
            if (error) reject("Error generating token")

            resolve(token)
        })
    })

}

// Export the generateJWT function for use in other modules
module.exports = generateJWT