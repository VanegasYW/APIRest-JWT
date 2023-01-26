const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

const getProfile = async (req, res) => {
    const token = req.header("x-validation") // Get the token from the request header

    const decoded = jwt.verify(token, process.env.SECRET_KEY) // Verify the token using the secret key specified in the SECRET_KEY environment variable

    const user = await User.findById(decoded.id)

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json({
        id: user._id,
        name: user.nombre,
        email: user.correo
    });
}

module.exports = getProfile