"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const successRouter = express_1.default.Router();
successRouter
    .get('/', (req, res) => res.status(200).json({
    message: 'Hi from the backend',
    requestedAt: new Date().toDateString(),
}))
    .post('/upload', (req, res) => {
    res.status(201).json({ message: 'Downloaded' });
});
exports.default = successRouter;
