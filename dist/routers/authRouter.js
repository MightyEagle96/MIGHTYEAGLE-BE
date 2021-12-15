"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_service_1 = require("../services/user.service");
const authRouter = express_1.default.Router();
authRouter.get('/users', user_service_1.GetUsers);
authRouter.post('/signUp', user_service_1.SignUp);
authRouter.post('/login', user_service_1.Login);
authRouter.post('/logout', user_service_1.Logout);
authRouter.post('/refresh_token', user_service_1.RefreshToken);
exports.default = authRouter;
