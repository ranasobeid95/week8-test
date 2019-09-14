const jwt = require('jsonwebtoken');
exports.isLogin = (req, res, next) => {

    jwt.verify(req.cookies.access, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            req.login = false;
        } else {
            req.login = true;
            req.id = decoded;
        }
    });
    next();

}