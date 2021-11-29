"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var questionController_1 = require("../../controllers/ME-SCHOOL/Class-Teacher/question handler/questionController");
var user_service_1 = require("../../services/user.service");
var questionRouter = express_1.default.Router();
questionRouter
    .use(user_service_1.IsLoggedIn)
    .post('/', questionController_1.CreateQuestion)
    .get('/', questionController_1.ViewQuestions)
    .get('/:collectionId/:questionId', questionController_1.ViewQuestion)
    .patch('/:collectionId/:questionId', user_service_1.RestrictTo('class teacher', 'teacher'), questionController_1.UpdateQuestion)
    .patch('/:collectionId/timer/paper', questionController_1.SetTimer)
    .patch('/:collectionId/toggleActivate/paper', questionController_1.ToggleActivation)
    .post('/delete/:id', questionController_1.DeleteQuestion);
exports.default = questionRouter;
