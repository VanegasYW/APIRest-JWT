const {Router} = require('express');
const {postUser} = require("../controllers/users.controller")
const {validators, validateErrors, emailAlreadyExists} = require("../middleware/validators") 
const validateData = [validators, validateErrors, emailAlreadyExists] 
const router = Router() // Create a new Router instance

router.post("/", ...validateData, postUser) // Handle a POST request to the root route with the register controller

// Export the router to be used in the main application
module.exports = router