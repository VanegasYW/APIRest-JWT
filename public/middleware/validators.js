const { check, validationResult } = require('express-validator')
const User = require('../models/users.model');

const validateErrors = (req, res, next) => {
    const error = validationResult(req) // Get the validation result from the request

    if (!error.isEmpty()) return res.status(404).json(error.errors); // If there are errors, return a 404 status code and the error messages

    next() // If there are no errors, call the next middleware function
}

const usersDoNotExist = async (req, res, next) => {
    const users = await User.find()

    if (!users.length) return res.status(404).json({
        success: false,
        message: 'Users not found'
    })

    next() // If there are users, call the next middleware function
}

const userDoesNotExist = async (req, res, next) => {
    const { id } = req.params // Destructuring the id parameter from the request parameters

    const user = await User.findById(id)

    if (!user) return res.status(404).json({
        success: false,
        message: 'User not found'
    })

    next() // If the user is found, call the next middleware function
}

const emailAlreadyExists = async (req, res, next) => {
    const { correo } = req.body// Destructuring the email from the request body
    const existingUser = await User.findOne({ correo });

    if (existingUser) return res.status(404).json({
        success: false,
        message: 'Email already exists'
    })

    next() // If the email is not already registered, call the next middleware function
}

// Array of validation checks for user input
const validators = [
    check("nombre")
        .notEmpty() // Check that the field is not empty
        .withMessage("Name is required")
        .isLength({ min: 3 }) // Check that the field has at least 3 characters
        .withMessage("Min character length is 3"),
    check("correo")
        .notEmpty() // Check that the field is not empty
        .withMessage("Email is required")
        .isEmail() // Check that the field is in the format of an email address
        .withMessage("Invalid email format"),
    check("clave")
        .notEmpty() // Check that the field is not empty
        .withMessage("Password is required")
        .isLength({ min: 6, max: 10 }) // Check that the field has at least 6 characters and at most 10
        .withMessage("Min character length is 6 and max is 10")
]

// Exports the middleware functions and validation checks for use in other parts of the application
module.exports = {
    validators,
    validateErrors,
    usersDoNotExist,
    userDoesNotExist,
    emailAlreadyExists
}