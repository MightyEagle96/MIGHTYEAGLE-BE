"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StoreAdminController_1 = require("../../../controllers/ME-SCHOOL/Store_Admin/StoreAdminController");
const user_service_1 = require("../../../services/user.service");
const storeManagementRouter = express_1.default.Router();
storeManagementRouter
    .use(user_service_1.IsLoggedIn)
    .post('/createItem', StoreAdminController_1.CreateProduct)
    .get('/viewProducts', StoreAdminController_1.ViewProducts);
exports.default = storeManagementRouter;
