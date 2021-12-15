"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuth = (req, res) => {
    const authorization = req.headers['authorization'];
    if (!authorization)
        return res.status(401).json({ message: 'You are not logged in' });
    const token = authorization.split(' ')[1];
    const { id } = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET || 'hello');
    return id;
};
exports.default = isAuth;
