const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function auth(req, res, next) {
    let token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');
    token = token.replace('Bearer ', '');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = auth;