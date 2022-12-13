const { check, validationResult } = require('express-validator')
const User = require('../models/users.model');

const validateErrors = (req, res, next) => {
    const error = validationResult(req)

    if (!error.isEmpty()) return res.status(404).json(
        error.errors
    );

    next()
}

const usersDoNotExist = async (req, res, next) => {
    const users = await User.find()
    if(users.length == 0) return res.json({
        "ok": 200,
        "msg": "No hay usuarios en la base de datos"
    })

    next()
}

const userDoesNotExist = async (req, res, next) => {
    const {id} = req.params

    const user = await User.findById(id)

    if(!user) return res.json({
        "msg": "Usuario no encontrado"
    })

    next()
}

const emailAlreadyExists = async (req, res, next) => {
    const {correo} = req.body

    if(await User.findOne({correo})) return res.json({
        "ok": 200,
        "msg": "El correo ya está registrado"
    })

    next()
}

const validators = [
    check("nombre")
        .notEmpty()
        .withMessage("El nombre es requerido")
        .isLength({ min: 3 })
        .withMessage("La longitud mínima de carácteres es de 3"),
    check("correo")
        .notEmpty()
        .withMessage("El correo es requerido")
        .isEmail()
        .withMessage("Formato de correo incorrecto"),
    check("clave")
        .notEmpty()
        .withMessage("El nombre es requerido")
        .isLength({ min: 6, max: 10 })
        .withMessage("La longitud mínima de carácteres es de 6 y máxima de 10")
]

module.exports = {
    validators,
    validateErrors,
    usersDoNotExist,
    userDoesNotExist,
    emailAlreadyExists
}