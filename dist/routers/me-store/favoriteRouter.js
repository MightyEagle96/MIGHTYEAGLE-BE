"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favorite_controller_1 = require("../../controllers/ME-STORES/favourites/favorite-controller");
const user_service_1 = require("../../services/user.service");
const favoriteRouter = express_1.default.Router();
favoriteRouter.get('/', favorite_controller_1.ViewFavorite);
favoriteRouter.use(user_service_1.IsLoggedIn);
favoriteRouter.post('/', favorite_controller_1.AddToFavorite);
exports.default = favoriteRouter;
