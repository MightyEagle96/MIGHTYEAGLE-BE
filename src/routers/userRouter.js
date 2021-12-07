"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var userController_1 = require("../controllers/userController");
var user_service_1 = require("../services/user.service");
var userRouter = express_1.default.Router();
exports.userRouter = userRouter;
var upload = multer_1.default({ dest: 'public/images' });
userRouter
    .use(user_service_1.IsLoggedIn)
    .get('/me', userController_1.GET_USER)
    .post('/uploadPhoto', upload.single('profilePhoto'), userController_1.UPLOAD_PHOTO)
    .post('/createUser', user_service_1.RestrictTo('admin'), userController_1.CREATE_USER);
