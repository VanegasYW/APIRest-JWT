const jwt = require('jsonwebtoken');

const validationJWT = (req, res, next) => {
    const token = req.header("x-validation") // Get the token from the request header

    if (!token) return res.status(401).json({ // if no token is present
        message: "No token provided"
    });

    try {
        const validation = jwt.verify(token, process.env.SECRET_KEY) // Verify the token using the secret key specified in the SECRET_KEY environment variable
        // res.json({
        //     validation: validation
        // })
    } catch (error) {

        return res.status(401).json({
            message: "Invalid token"
        });
    }

    next() // Move to the next middleware
}

// Export the middleware function to be used in other parts of the application.
module.exports = validationJWT