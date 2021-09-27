"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var levelController_1 = require("../../controllers/ME-SCHOOL/Admin/level handler/levelController");
var levelRouter = express_1.default.Router();
levelRouter.post('/', levelController_1.CreateLevel);
levelRouter.get('/', levelController_1.ViewLevels);
levelRouter.get('/:id', levelController_1.ViewLevel);
exports.default = levelRouter;
