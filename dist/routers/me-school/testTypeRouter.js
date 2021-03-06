"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testTypeController_1 = require("../../controllers/ME-SCHOOL/handle_exams/testTypeController");
const testTypeRouter = express_1.default.Router();
testTypeRouter.post('/', testTypeController_1.CreateTestType);
testTypeRouter.get('/', testTypeController_1.ViewTestTypes);
exports.default = testTypeRouter;
