"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const questionController_1 = require("../../controllers/ME-SCHOOL/Class-Teacher/question_handler/questionController");
const user_service_1 = require("../../services/user.service");
const questionRouter = express_1.default.Router();
const upload = multer_1.default({ dest: 'public/documents' });
questionRouter
    .use(user_service_1.IsLoggedIn)
    .post('/', upload.single('questions'), questionController_1.CreateQuestion)
    .get('/', questionController_1.ViewQuestions)
    .get('/:collectionId/:questionId', questionController_1.ViewQuestion)
    .patch('/:collectionId/:questionId', user_service_1.RestrictTo('class teacher', 'teacher'), questionController_1.UpdateQuestion)
    .patch('/:collectionId/timer/paper', questionController_1.SetTimer)
    .patch('/:collectionId/toggleActivate/paper', questionController_1.ToggleActivation)
    .patch('/:collectionId/divisor/paper', questionController_1.SetDivisor)
    .post('/delete/:id', questionController_1.DeleteQuestion);
exports.default = questionRouter;
