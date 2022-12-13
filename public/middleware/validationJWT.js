const jwt = require('jsonwebtoken');
const {request, response} = require("express")

const validationJWT = (req, res, next) => {

    const token = req.header("x-validation")
    
    if(!token) return res.json({
        "ok": 200,
        "msg": "El token no fue ingresado"
    })

    try {
        const validation = jwt.verify(token, process.env.SECRET_KEY)
        // res.json({
        //     validation: validation
        // })
    } catch (error) {

        res.json({
            "ok": 200,
            "msg": "El token no coincide"
        })
    }

    next()
}

module.exports = validationJWT