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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.RestrictTo = exports.RefreshToken = exports.IsLoggedIn = exports.Login = exports.SignUp = exports.GetUsers = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var user_1 = __importDefault(require("../models/user"));
var catchAsync_1 = require("../shared/catchAsync");
var isAuth_1 = __importDefault(require("../utils/isAuth"));
var tokens_1 = require("../utils/tokens");
exports.GetUsers = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.find()];
            case 1:
                users = _a.sent();
                res.json({ users: users });
                return [2 /*return*/];
        }
    });
}); });
exports.SignUp = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, accessToken, refreshToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    return [2 /*return*/, res.status(400).json({ message: 'Email is required' })];
                if (!req.body.password)
                    return [2 /*return*/, res.status(400).json({ message: 'Password is required' })];
                return [4 /*yield*/, user_1.default.create(req.body)];
            case 1:
                user = _a.sent();
                accessToken = tokens_1.createAccessToken({ id: user._id });
                refreshToken = tokens_1.createRefreshToken({ id: user._id });
                user.refreshToken = refreshToken;
                tokens_1.sendRefreshToken(res, refreshToken);
                tokens_1.sendAccessToken(user, req, res, accessToken);
                res.send('done');
                return [2 /*return*/];
        }
    });
}); });
exports.Login = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, accessToken, refreshToken;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_1.default.findOne({ email: email })];
            case 1:
                user = _b.sent();
                //if there is no user
                if (!user)
                    return [2 /*return*/, res.status(401).json({ message: 'Incorrect Email or Password' })];
                return [4 /*yield*/, user.comparePasswords(password)];
            case 2:
                if (!_b.sent()) return [3 /*break*/, 4];
                accessToken = tokens_1.createAccessToken({ id: user._id });
                refreshToken = tokens_1.createRefreshToken({ id: user._id });
                return [4 /*yield*/, user_1.default.findByIdAndUpdate(user._id, {
                        refreshToken: refreshToken,
                        isNewAccount: false,
                    })];
            case 3:
                _b.sent();
                tokens_1.sendRefreshToken(res, refreshToken);
                tokens_1.sendAccessToken(user, req, res, accessToken);
                return [3 /*break*/, 5];
            case 4: return [2 /*return*/, res.status(401).json({ message: 'Incorrect Email or Password' })];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.IsLoggedIn = catchAsync_1.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = isAuth_1.default(req, res);
                if (!(userId !== null)) return [3 /*break*/, 2];
                return [4 /*yield*/, user_1.default.findById(userId)];
            case 1:
                user = _a.sent();
                req.user = user;
                _a.label = 2;
            case 2: return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(401).send(error_1)];
            case 4:
                next();
                return [2 /*return*/];
        }
    });
}); });
exports.RefreshToken = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, payload, user, accessToken, refreshToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.cookies.refreshToken;
                if (!token)
                    return [2 /*return*/, res.send({ accessToken: '' })];
                payload = null;
                try {
                    payload = jsonwebtoken_1.verify(token, process.env.REFRESH_TOKEN_SECRET ||
                        'i-love-the-lord-and-if-loving-him-is-wrong-then-i-dont-wanna-be-right');
                }
                catch (error) {
                    return [2 /*return*/, res.send({ accessToken: '' })];
                }
                return [4 /*yield*/, user_1.default.findById(payload.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.send({ accessToken: 'rgrgrgrgr' })];
                //user exists, confirm refreshToken
                if (user.refreshToken !== token)
                    return [2 /*return*/, res.send({ accessToken: '' })];
                accessToken = tokens_1.createAccessToken({ id: user._id });
                refreshToken = tokens_1.createRefreshToken({ id: user._id });
                return [4 /*yield*/, user_1.default.findByIdAndUpdate(user._id, { refreshToken: refreshToken })];
            case 2:
                _a.sent();
                tokens_1.sendRefreshToken(res, refreshToken);
                //sendAccessToken(user, req, res, accessToken);
                return [2 /*return*/, res.send({ accessToken: accessToken, user: user })];
        }
    });
}); });
var RestrictTo = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return function (req, res, next) {
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
exports.Logout = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.clearCookie('refreshToken', { path: 'refresh_token' });
        return [2 /*return*/, res.send('Logged out')];
    });
}); });
