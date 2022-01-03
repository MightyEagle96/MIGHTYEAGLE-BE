"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jambCenterController_1 = require("../../controllers/JAMB/jambCenterController");
const jambRouter = express_1.default.Router();
jambRouter
    //   .use(IsLoggedIn)
    //   .use(RestrictTo('admin'))
    .post('/createCenter', jambCenterController_1.CreateCenter)
    .get('/getCenters', jambCenterController_1.GetCenters)
    .get('/getCenters/:centerId', jambCenterController_1.GetCenter);
exports.default = jambRouter;
