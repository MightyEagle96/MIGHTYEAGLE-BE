"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveSession = exports.UpdateSession = exports.ListSessions = exports.CreateSession = void 0;
const catchAsync_1 = require("../../../../shared/catchAsync");
const sessionModel_1 = __importDefault(require("./sessionModel"));
const user_1 = __importDefault(require("../../../../models/user"));
exports.CreateSession = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    //first of all set all active sessions from true to false
    yield sessionModel_1.default.updateMany({ activeSession: true }, { activeSession: false });
    req.body.activeSession = true;
    const currentSession = yield sessionModel_1.default.create(req.body);
    yield user_1.default.updateMany({ account_type: 'me-school' }, { currentSession: currentSession._id });
    res.status(201).json({ message: 'New session created', currentSession });
}));
exports.ListSessions = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessions = yield sessionModel_1.default.find();
    res.json({ sessions });
}));
exports.UpdateSession = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield sessionModel_1.default.updateMany({ activeSession: true }, { activeSession: false });
    const currentSession = yield sessionModel_1.default.findByIdAndUpdate(req.params.id, {
        activeSession: req.body.activeSession,
    });
    yield user_1.default.updateMany({ account_type: 'me-school' }, { currentSession: req.params.id });
    res.json({ message: 'Session updated', currentSession });
}));
exports.ActiveSession = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //to get the active term
    const currentSession = yield sessionModel_1.default.find({ activeSession: true });
    if (currentSession) {
        res.json({ activeSession: currentSession[0] });
    }
    else
        res.json({ activeSession: { session: '-' } });
}));
