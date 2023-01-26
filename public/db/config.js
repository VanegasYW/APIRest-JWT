const mongoose = require('mongoose');

const conn = () => {
    try {
        // Connect to MongoDB using the connection specified in the MONGO_CNN environment variable
        mongoose.connect(process.env.MONGO_CNN, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Successful connection");
    } catch (error) {
        console.error(error);
    }
}

// Export the conn function for use in other files.
module.exports = conn
