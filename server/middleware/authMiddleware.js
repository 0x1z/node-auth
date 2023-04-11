const jwt = require('jsonwebtoken');
const usermodel = require('../model/schema');


const auth = (req, res, next) => {
    const token = req.cookies.jwt;
    // check to verify if the request has the jwt set or not and is verified or not
    if (token) {
        jwt.verify(token, 'dragon ball z', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/log_in');
            }
            else {
                console.log(decodedToken);
                next();
            }
        });

    }
    else {
        res.redirect('/log_in');
    }
}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'dragon ball z', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken)
                let user = await usermodel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });

    }
    else {
        res.locals.user = null
        next();
    }
}

module.exports = auth;
module.exports = checkUser;
