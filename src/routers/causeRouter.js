"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.causeRouter = void 0;
var express_1 = __importDefault(require("express"));
var user_service_1 = require("../services/user.service");
var causeController_1 = require("../controllers/causeController");
var causeRouter = express_1.default.Router();
exports.causeRouter = causeRouter;
causeRouter.get('/', causeController_1.GetCauses);
causeRouter.get('/:id', causeController_1.GetCause);
causeRouter.use(user_service_1.IsLoggedIn);
causeRouter.post('/', causeController_1.CreateCause);
causeRouter.patch('/:id', causeController_1.UpdateCause);
