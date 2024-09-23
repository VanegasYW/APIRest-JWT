const {Router} = require('express');
const getProfile = require("../controllers/profile.controller")
const validationJWT = require("../middleware/validationJWT")
const rateLimit = require('express-rate-limit');

const router = Router() // Create a new Router instance

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

router.get("/", limiter, validationJWT, getProfile) // Handle a POST request to the root route with the userAuthentication controller

// Export the router to be used in the main application
module.exports = router