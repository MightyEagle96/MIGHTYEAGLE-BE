"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_service_1 = require("../services/user.service");
var donationController_1 = require("../controllers/donationController");
var donationRouter = express_1.default.Router();
donationRouter.use(user_service_1.IsLoggedIn);
donationRouter.post('/:causeId', donationController_1.MakeDonation);
exports.default = donationRouter;
