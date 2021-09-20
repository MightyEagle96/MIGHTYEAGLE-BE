"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var rating_controller_1 = require("../../controllers/ME-STORES/ratings/rating-controller");
var user_service_1 = require("../../services/user.service");
var ratingRouter = express_1.default.Router();
ratingRouter.post('/', user_service_1.IsLoggedIn, rating_controller_1.MakeReview);
exports.default = ratingRouter;
