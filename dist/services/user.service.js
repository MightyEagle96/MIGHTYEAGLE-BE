"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.RestrictTo = exports.RefreshToken = exports.IsLoggedIn = exports.Login = exports.SignUp = exports.GetUsers = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = __importDefault(require("../models/user"));
const catchAsync_1 = require("../shared/catchAsync");
const isAuth_1 = __importDefault(require("../utils/isAuth"));
const tokens_1 = require("../utils/tokens");
exports.GetUsers = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find();
    res.json({ users });
}));
exports.SignUp = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.account_type) {
        return res.status(400).json({ message: 'An Account type is required' });
    }
    if (!req.body.email)
        return res.status(400).json({ message: 'Email is required' });
    if (!req.body.password)
        return res.status(400).json({ message: 'Password is required' });
    const user = yield user_1.default.create(req.body);
    const accessToken = tokens_1.createAccessToken({ id: user._id });
    const refreshToken = tokens_1.createRefreshToken({ id: user._id });
    user.refreshToken = refreshToken;
    tokens_1.sendRefreshToken(res, refreshToken);
    tokens_1.sendAccessToken(user, req, res, accessToken);
    res.send('done');
}));
exports.Login = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email }).populate([
        'currentSession',
        'level',
        'currentTerm',
    ]);
    //if there is no user
    if (!user)
        return res.status(401).json({ message: 'Incorrect Email or Password' });
    if (yield user.comparePasswords(password)) {
        const accessToken = tokens_1.createAccessToken({ id: user._id });
        const refreshToken = tokens_1.createRefreshToken({ id: user._id });
        yield user_1.default.findByIdAndUpdate(user._id, {
            refreshToken: refreshToken,
        });
        tokens_1.sendRefreshToken(res, refreshToken);
        tokens_1.sendAccessToken(user, req, res, accessToken);
    }
    else
        return res.status(401).json({ message: 'Incorrect Email or Password' });
}));
exports.IsLoggedIn = catchAsync_1.catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = isAuth_1.default(req, res);
        if (userId !== null) {
            const user = yield user_1.default.findById(userId);
            req.user = user;
        }
    }
    catch (error) {
        return res.status(401).json({ message: 'invalid token' });
    }
    next();
}));
exports.RefreshToken = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.refreshToken;
    if (!token)
        return res.send({ accessToken: '' });
    let payload = null;
    try {
        payload = jsonwebtoken_1.verify(token, process.env.REFRESH_TOKEN_SECRET ||
            'i-love-the-lord-and-if-loving-him-is-wrong-then-i-dont-wanna-be-right');
    }
    catch (error) {
        return res.send({ accessToken: '' });
    }
    //token is valid
    const user = yield user_1.default.findById(payload.id);
    if (!user)
        return res.send({ accessToken: 'rgrgrgrgr' });
    //user exists, confirm refreshToken
    if (user.refreshToken !== token)
        return res.send({ accessToken: '' });
    //token exist, create new refresh and access token
    const accessToken = tokens_1.createAccessToken({ id: user._id });
    const refreshToken = tokens_1.createRefreshToken({ id: user._id });
    yield user_1.default.findByIdAndUpdate(user._id, { refreshToken: refreshToken });
    tokens_1.sendRefreshToken(res, refreshToken);
    //sendAccessToken(user, req, res, accessToken);
    return res.send({ accessToken, user });
}));
const RestrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'lead-guide']. role='user'
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'You do not have permission to perform this action. \nContact your administrator',
            });
        }
        next();
    };
};
exports.RestrictTo = RestrictTo;
exports.Logout = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('refreshToken', { path: 'refresh_token' });
    return res.send('Logged out');
}));
