const {Router} = require('express');
const {getUsers, getUserById, postUser, putUser, deleteUser} = require('../controllers/users.controller');
const {validators, validateErrors, usersDoNotExist, userDoesNotExist, emailAlreadyExists} = require("../middleware/validators")
const validationJWT = require("../middleware/validationJWT")
const validateData = [validators, validateErrors, emailAlreadyExists] // Array of the validators and error handling middleware functions.

// Instance of the Express Router.
const router = Router()

// Routes for the user management system. Each route uses various middleware functions for validation and error handling, as well as the appropriate controller function for the specific CRUD operation.

router.get("/", validationJWT, usersDoNotExist, getUsers);
router.get("/:id", validationJWT, userDoesNotExist, getUserById);
router.post("/", validationJWT, ...validateData, postUser);
router.put("/:id", validationJWT, ...validateData, putUser);
router.delete("/:id", validationJWT, userDoesNotExist, deleteUser);

// This line exports the router instance so it can be used in other parts of the application.
module.exports = router