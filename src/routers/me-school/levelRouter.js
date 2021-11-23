"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var levelController_1 = require("../../controllers/ME-SCHOOL/Admin/level handler/levelController");
var user_service_1 = require("../../services/user.service");
var levelRouter = express_1.default.Router();
levelRouter.get('/view', levelController_1.ViewLevels);
levelRouter.use(user_service_1.IsLoggedIn);
levelRouter.get('/:id', levelController_1.ViewLevel);
levelRouter.use(user_service_1.RestricTo('admin'));
levelRouter.post('/create', levelController_1.CreateLevel);
exports.default = levelRouter;
