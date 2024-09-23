const {Router} = require('express');
const userAuthentication = require("../controllers/auth.controller")
const RateLimit = require('express-rate-limit');

const router = Router() // Create a new Router instance

// set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to the userAuthentication route
router.post("/", limiter, userAuthentication) // Handle a POST request to the root route with the userAuthentication controller

// Export the router to be used in the main application
module.exports = router