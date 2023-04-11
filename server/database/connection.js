const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/auth";
const Userdb = async () => {
    try {
        const con = await mongoose.connect(URI);
        console.log(`connected to mongodb on ${con.connection.host}`);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = Userdb;