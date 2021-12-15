"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshToken = exports.sendAccessToken = exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createAccessToken = (id) => {
    return jsonwebtoken_1.sign(id, process.env.ACCESS_TOKEN_SECRET || 'in the shadow of his wings', {
        expiresIn: '1d',
    });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (id) => {
    return jsonwebtoken_1.sign(id, process.env.REFRESH_TOKEN_SECRET || 'in the shadow of his wings', {
        expiresIn: '1d',
    });
};
exports.createRefreshToken = createRefreshToken;
const sendAccessToken = (user, req, res, accessToken) => {
    res.json({
        accessToken,
        user,
    });
};
exports.sendAccessToken = sendAccessToken;
const sendRefreshToken = (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: 'refresh_token',
    });
};
exports.sendRefreshToken = sendRefreshToken;
