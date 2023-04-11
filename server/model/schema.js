const mongoose = require('mongoose');
const validator = require("validator");
const isEmail = validator.isEmail;
const bcrypt = require('bcrypt');

const userschema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "please enter an password"],
        minlength: [6, "please enter the password with length more than 6"]
    }
});
// Mongoose hooks here we using pree hook to salt password
userschema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static login model to login user
userschema.statics.login = async function (email, password) {
    const user = await this.findOne({ email: email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("Incorrect Password");
    }
    throw Error('Incorrect Email');
}

const usermodel = mongoose.model('auth', userschema);
module.exports = usermodel;