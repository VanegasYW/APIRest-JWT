const User = require('../models/users.model');
const bcryptjs = require('bcryptjs');
const generateJWT = require("../helpers/generateJWT")

const userAuthentication = async (req, res) => {
    try {
        const { nombre, clave } = req.body // Destructure the request body to retrieve the user's name and password
        const user = await User.findOne({ nombre: { $eq: nombre } }) 

        if (!user) return res.status(404).json({
            success: false,
            message: 'User not found'
        });

        const isMatch = bcryptjs.compareSync(clave, user.clave) // Compare the provided password with the hashed password in the database

        if (!isMatch) return res.status(401).json({  // Compare the provided password with the hashed password in the database
            success: false,
            message: 'Incorrect password'
        });

        const token = await generateJWT(user._id, user.nombre, user.correo) // Generate a JWT for the user

        res.status(200).json({ // Return the JWT to the user
            success: true,
            message: 'Token created',
            token
        });
    } catch (error) {
        res.status(500).json({ // Handle errors by returning a 500 status and an error message
            success: false,
            message: 'Server error'
        })
    }
}

// Export the userAuthentication function for use in other modules
module.exports = userAuthentication