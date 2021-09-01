"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var isAuth = function (req, res) {
    var authorization = req.headers['authorization'];
    if (!authorization)
        return res.status(401).json({ message: 'You are not logged in' });
    var token = authorization.split(' ')[1];
    var id = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET || 'hello').id;
    return id;
};
exports.default = isAuth;
