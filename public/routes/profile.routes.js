const {Router} = require('express');
const getProfile = require("../controllers/profile.controller")
const validationJWT = require("../middleware/validationJWT")

const router = Router() // Create a new Router instance

router.get("/", validationJWT, getProfile) // Handle a POST request to the root route with the userAuthentication controller

// Export the router to be used in the main application
module.exports = router