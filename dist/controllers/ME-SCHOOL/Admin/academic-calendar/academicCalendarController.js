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
exports.SetAcademicCalendar = void 0;
const user_1 = __importDefault(require("../../../../models/user"));
const catchAsync_1 = require("../../../../shared/catchAsync");
const sessionModel_1 = __importDefault(require("../session_handler/sessionModel"));
const termModel_1 = __importDefault(require("../termHandler/termModel"));
exports.SetAcademicCalendar = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentSession = yield sessionModel_1.default.findOne({ activeSession: true });
    const currentTerm = yield termModel_1.default.findOne({ activeTerm: true });
    yield user_1.default.updateMany({ account_type: 'me-school' }, { currentTerm: currentTerm._id, currentSession: currentSession._id });
    res.json({ message: 'done' });
}));
