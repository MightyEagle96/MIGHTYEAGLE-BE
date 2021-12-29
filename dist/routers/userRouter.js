"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const userController_1 = require("../controllers/userController");
const user_service_1 = require("../services/user.service");
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
const upload = multer_1.default({ dest: 'public/images' });
userRouter
    .use(user_service_1.IsLoggedIn)
    .get('/me', userController_1.GET_ME)
    .post('/uploadPhoto', upload.single('profilePhoto'), userController_1.UPLOAD_PHOTO)
    .post('/createUser', user_service_1.RestrictTo('admin'), userController_1.CREATE_USER)
    .get('/findUser/:id', user_service_1.RestrictTo('admin', 'class teacher'), userController_1.FIND_USER)
    .post('/updatePassword', userController_1.UPDATE_PASSWORD);
