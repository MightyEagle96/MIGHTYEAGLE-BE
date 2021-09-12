"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var successRouter = express_1.default.Router();
successRouter.get('/', function (req, res) {
    return res.status(200).json({
        message: 'Hi from the backend',
        requestedAt: new Date().toDateString(),
    });
});
exports.default = successRouter;
