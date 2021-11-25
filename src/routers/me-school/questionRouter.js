"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var questionController_1 = require("../../controllers/ME-SCHOOL/Class-Teacher/question handler/questionController");
var questionRouter = express_1.default.Router();
questionRouter.post('/', questionController_1.CreateQuestion);
questionRouter.get('/', questionController_1.ViewQuestions);
questionRouter.get('/:collectionId/:questionId', questionController_1.ViewQuestion);
questionRouter.patch('/:collectionId/:questionId', questionController_1.UpdateQuestion);
questionRouter.patch('/:collectionId/timer/paper', questionController_1.SetTimer);
questionRouter.patch('/:collectionId/toggleActivate/paper', questionController_1.ToggleActivation);
questionRouter.post('/delete/:id', questionController_1.DeleteQuestion);
exports.default = questionRouter;
