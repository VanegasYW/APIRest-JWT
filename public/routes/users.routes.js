const {Router} = require('express');
const {getUser, getUserById, postUser, putUser, deleteUser} = require('../controllers/users.controller');
const {validators, validateErrors, usersDoNotExist, userDoesNotExist, emailAlreadyExists} = require("../middleware/validators")
const validationJWT = require("../middleware/validationJWT")
const validateData = [validators, validateErrors, emailAlreadyExists]

const router = Router()

router.get("/", [validationJWT, usersDoNotExist], getUser)

router.get("/:id", [validationJWT, userDoesNotExist],getUserById)

router.post("/", [validationJWT, validateData],  postUser)

router.put("/:id", [validationJWT, validateData], putUser)

router.delete("/:id", [validationJWT, userDoesNotExist], deleteUser)

module.exports = router