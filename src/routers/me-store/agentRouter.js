"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var agent_controller_1 = require("../../controllers/ME-STORES/agents/agent-controller");
var agentRouter = express_1.default.Router();
agentRouter.get('/', agent_controller_1.ViewAgents);
agentRouter.post('/', agent_controller_1.CreateAgent);
exports.default = agentRouter;
