"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_service_1 = require("../services/user.service");
const donationController_1 = require("../controllers/donationController");
const donationRouter = express_1.default.Router();
donationRouter.use(user_service_1.IsLoggedIn);
donationRouter.post('/:causeId', donationController_1.MakeDonation);
exports.default = donationRouter;
