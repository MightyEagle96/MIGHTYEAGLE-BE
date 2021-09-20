"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var subjectController_1 = require("../../controllers/ME-SCHOOL/subjects/subjectController");
var subjectRouter = express_1.default.Router();
subjectRouter.post('/', subjectController_1.CreateSubject);
subjectRouter.get('/', subjectController_1.ViewSubjects);
exports.default = subjectRouter;
