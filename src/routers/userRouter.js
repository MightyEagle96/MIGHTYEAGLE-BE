"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var userController_1 = require("../controllers/userController");
var user_service_1 = require("../services/user.service");
var userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.use(user_service_1.IsLoggedIn);
userRouter.get('/:id', userController_1.GET_USER);
