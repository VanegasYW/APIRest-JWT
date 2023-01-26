const {Router} = require('express');
const userAuthentication = require("../controllers/auth.controller")

const router = Router() // Create a new Router instance

router.post("/", userAuthentication) // Handle a POST request to the root route with the userAuthentication controller

// Export the router to be used in the main application
module.exports = router