const express = require('express');
const cors = require('cors');
const conn = require('../public/db/config');

// Server class that sets up the express app, connects to the database, sets up middleware, and defines routes
class Server {
    constructor() {
        this.app = express() // Create an express app
        this.port = process.env.PORT // Use the port specified in the PORT environment variable

        // Connect to the database, set up middleware and define routes
        this.connectDB()
        this.middleware()
        this.routes()
    }

    connectDB() {
        conn()
    }

    middleware() {
        this.app.use(express.static("/public")) // Serve static files from the "public" folder
        this.app.use(express.json()) // Use express.json() to parse json data in the body of requests
        this.app.use(cors()) // Use cors middleware to allow cross-origin requests
    }

    routes() {
        // Use the "users, "auth", "register" and " "register" routes for requests to the "/api/users", "/api/auth", "/api/register" and "/api/profile"   endpoints
        this.app.use("/api/users/", require("../public/routes/users.routes"))
        this.app.use("/api/auth/", require("../public/routes/auth.routes"))
        this.app.use("/api/register/", require("../public/routes/register.routes"))
        this.app.use("/api/profile/", require("../public/routes/profile.routes"))
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        })
    }
}

module.exports = Server