const User = require('../models/users.model');
const bcryptjs = require('bcryptjs');

const getUsers = async (req, res) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        message: 'All users retrieved',
        data: users,
    });
}

const getUserById = async (req, res) => {
    const { id } = req.params // Destructuring the id parameter from the request parameters

    const user = await User.findById(id) 

    res.status(200).json({
        success: true,
        message: 'User retrieved',
        data: user
    })
}

const postUser = async (req, res) => {
    const { nombre, correo, clave, estado } = req.body // Destructuring the request body to get the user's name, email, password, and status

    const salt = bcryptjs.genSaltSync() 

    const hashClave = bcryptjs.hashSync(clave, salt) 

    const user = new User({ nombre, correo, clave:hashClave, estado }) // Creating a new User object with the destructured data

    const newUser = await user.save() 

    res.status(201).json({
        success: true,
        message: 'User created',
        data: newUser,
    });
}

const putUser = async (req, res) => {
    const { id } = req.params // Destructuring the id parameter from the request parameters

    const { nombre, correo, clave, estado } = req.body // Destructuring the request body to get the user's updated name, email, password, and status

    const salt = bcryptjs.genSaltSync() 

    const hashClave = bcryptjs.hashSync(clave, salt) 

    const user = await User.findByIdAndUpdate(id, { nombre, correo, clave: hashClave, estado }) // Updating a User object with the destructured data

    res.status(200).json({ 
        success: true,
        message: 'User updated',
        data: user,
    });
}

const deleteUser = async (req, res) => {
    const { id } = req.params // Destructuring the id parameter from the request parameters

    const user = await User.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        message: 'User deleted',
        data: user,
    });
}

// Exporting the functions as a module for use in other files
module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser
}