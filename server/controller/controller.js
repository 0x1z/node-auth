// importing user model to do things like create update delete with the db
const usermodel = require('../model/schema')
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };

    if (err.code === 11000) {
        errors.email = "that email already exists";
        return errors;
    }
    // incorrect email and passsword
    if (err.message === 'Incorrect Email') {
        errors.email = 'Your email is not registered';
    }

    if (err.message === 'Incorrect Password') {
        errors.password = 'Your password is invalid';
    }

    // validation errors
    if (err.message.includes("auth validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
        console.log(errors)
    }
    return errors;
}

// token creation takes in a secret to sign the token you will need it in middleware to verify
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'dragon ball z', {
        expiresIn: maxAge
    });
}

module.exports.sign_upGet = (req, res) => {
    res.render('sign_up');
}

module.exports.log_inGet = (req, res) => {
    res.render('log_in');
}

module.exports.sign_upPost = async (req, res) => {
    const { email, password } = req.body; // Destructure email and password from req.body
    try {
        const user = await usermodel.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user: user._id });

    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

module.exports.log_inPost = async (req, res) => {
    const { email, password } = req.body; // Destructure email and password from req.body
    try {
        const user = await usermodel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id })
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.log_outGet = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}