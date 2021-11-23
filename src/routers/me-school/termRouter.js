"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var termController_1 = require("../../controllers/ME-SCHOOL/Admin/termHandler/termController");
var user_service_1 = require("../../services/user.service");
var termRouter = express_1.default.Router();
termRouter
    .post('/create', user_service_1.IsLoggedIn, user_service_1.RestrictTo('admin'), termController_1.CreateCurrentTerm)
    .get('/view', termController_1.ListTerms)
    .patch('/update/:id', termController_1.UpdateTerm)
    .get('/activeTerm', termController_1.ActiveTerm);
exports.default = termRouter;
