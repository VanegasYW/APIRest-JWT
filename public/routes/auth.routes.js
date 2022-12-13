const {Router} = require('express');
const userAuthentication = require("../controllers/auth.controller")
const router = Router()

router.post("/", userAuthentication)

module.exports = router