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


// MONGODB hooks
// userschema.post('save', function (doc, next) {
//     console.log("user created sucessfully", doc);
//     next();
// });

// userschema.pre('save', function (next) {
//     console.log("user about to be created", this);
//     next();
// });

// hashing passwords with bcrypt

userschema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const usermodel = mongoose.model('auth', userschema);
module.exports = usermodel;