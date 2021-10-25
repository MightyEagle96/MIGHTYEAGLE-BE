"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var termController_1 = require("../../controllers/ME-SCHOOL/Admin/termHandler/termController");
var termRouter = express_1.default.Router();
termRouter.post('/create', termController_1.CreateCurrentTerm);
termRouter.get('/view', termController_1.ListTerms);
exports.default = termRouter;
