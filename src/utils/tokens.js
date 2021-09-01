"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshToken = exports.sendAccessToken = exports.createRefreshToken = exports.createAccessToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var createAccessToken = function (id) {
    return jsonwebtoken_1.sign(id, process.env.ACCESS_TOKEN_SECRET || 'in the shadow of his wings', {
        expiresIn: '1d',
    });
};
exports.createAccessToken = createAccessToken;
var createRefreshToken = function (id) {
    return jsonwebtoken_1.sign(id, process.env.REFRESH_TOKEN_SECRET || 'in the shadow of his wings', {
        expiresIn: '1d',
    });
};
exports.createRefreshToken = createRefreshToken;
var sendAccessToken = function (user, req, res, accessToken) {
    res.json({
        accessToken: accessToken,
        user: user,
    });
};
exports.sendAccessToken = sendAccessToken;
var sendRefreshToken = function (res, refreshToken) {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: 'refresh_token',
    });
};
exports.sendRefreshToken = sendRefreshToken;
