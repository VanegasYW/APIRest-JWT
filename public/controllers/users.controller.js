const User = require('../models/users.model');
const bcryptjs = require('bcryptjs');

const getUser = async (req, res) => {
    const users = await User.find()

    res.json({
        "ok": 200,
        "msg": "Todos los usuarios",
        users
    })
} 

const getUserById = async (req, res) => {
    const {id} = req.params

    const user = await User.findById(id)

    res.json({
        "ok": 200,
        "msg": "Usuario encontrado",
        user
    })
} 

const postUser = async (req, res) => {
    const {nombre, correo, clave, estado} = req.body

    const user = new User({ nombre, correo, clave, estado })

    const salt = bcryptjs.genSaltSync()

    user.clave = bcryptjs.hashSync(user.clave, salt)

    await user.save()

    res.json({
        "ok": 200,
        "msg": "Usuario creado",
        user
    })
} 

const putUser = async (req, res) => {
    const {id} = req.params

    const {nombre, correo, clave, estado} = req.body

    const user = await User.findByIdAndUpdate(id, {nombre, correo, clave, estado})

    const salt = bcryptjs.genSaltSync()

    user.clave = bcryptjs.hashSync(user.clave, salt)

    res.json({
        "ok": 200,
        "msg": "Usuario actualizado",
        user
    })
} 

const deleteUser = async (req, res) => {
    const {id} = req.params

    const user = await User.findByIdAndDelete(id)

    res.json({
        "ok": 200,
        "msg": "Usuario eliminado",
        user
    })
} 

module.exports = {
    getUser,
    getUserById,
    postUser,
    putUser,
    deleteUser
}