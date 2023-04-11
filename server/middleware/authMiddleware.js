const jwt = require('jsonwebtoken');


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


module.exports = auth;