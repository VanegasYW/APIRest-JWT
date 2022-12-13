const mongoose = require('mongoose');

const conn = () => {
    try{
        mongoose.connect(process.env.MONGO_CNN)
        console.log("Conexion exitosa");
    }catch(error){
        console.log(error);
    }
} 

module.exports = conn
