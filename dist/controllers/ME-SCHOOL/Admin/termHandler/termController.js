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
exports.ActiveTerm = exports.UpdateTerm = exports.ListTerms = exports.CreateCurrentTerm = void 0;
const catchAsync_1 = require("../../../../shared/catchAsync");
const termModel_1 = __importDefault(require("./termModel"));
const user_1 = __importDefault(require("../../../../models/user"));
exports.CreateCurrentTerm = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield termModel_1.default.updateMany({ activeTerm: true }, { activeTerm: false });
    req.body.activeTerm = true;
    const currentTerm = yield termModel_1.default.create(req.body);
    yield user_1.default.updateMany({ account_type: 'me-school' }, { currentTerm: currentTerm._id });
    res.json({ message: 'New term created', currentTerm });
}));
exports.ListTerms = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const terms = yield termModel_1.default.find(req.query);
    res.json({ terms });
}));
exports.UpdateTerm = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield termModel_1.default.updateMany({ activeTerm: true }, { activeTerm: false });
    const currentTerm = yield termModel_1.default.findByIdAndUpdate(req.params.id, {
        activeTerm: req.body.activeTerm,
    });
    yield user_1.default.updateMany({ account_type: 'me-school' }, { currentTerm: req.params.id });
    res.json({ message: 'Term updated', currentTerm });
}));
exports.ActiveTerm = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //to get the active term
    const currentTerm = yield termModel_1.default.find({ activeTerm: true });
    if (currentTerm) {
        res.json({ activeTerm: currentTerm[0] });
    }
    else
        res.json({ activeTerm: { term: '' } });
}));
