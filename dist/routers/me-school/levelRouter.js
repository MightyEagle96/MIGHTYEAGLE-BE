"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const levelController_1 = require("../../controllers/ME-SCHOOL/Admin/level_handler/levelController");
const user_service_1 = require("../../services/user.service");
const levelRouter = express_1.default.Router();
levelRouter.get('/view', levelController_1.ViewLevels);
levelRouter.use(user_service_1.IsLoggedIn);
levelRouter.get('/:id', levelController_1.ViewLevel);
levelRouter.use(user_service_1.RestrictTo('admin'));
levelRouter.post('/create', levelController_1.CreateLevel);
exports.default = levelRouter;
