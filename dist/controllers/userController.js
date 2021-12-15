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
exports.FIND_USER = exports.CREATE_USER = exports.UPLOAD_PHOTO = exports.GET_ME = void 0;
const user_1 = __importDefault(require("../models/user"));
const fs_1 = __importDefault(require("fs"));
const catchAsync_1 = require("../shared/catchAsync");
const path_1 = __importDefault(require("path"));
const labels_1 = require("../utils/labels");
const sessionModel_1 = __importDefault(require("./ME-SCHOOL/Admin/session_handler/sessionModel"));
const termModel_1 = __importDefault(require("./ME-SCHOOL/Admin/termHandler/termModel"));
exports.GET_ME = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.user._id);
    return res.json({ user });
}));
exports.UPLOAD_PHOTO = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = `public/images/${req.user._id}-${Date.now()}.${req.file.mimetype.split('/')[1]}`;
    fs_1.default.rename(`public/images/${req.file.filename}`, filePath, () => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.findByIdAndUpdate(req.user._id, {
            imageUrl: path_1.default.basename(filePath),
        });
    }));
    res.json({ message: 'image uploaded' });
}));
exports.CREATE_USER = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //if the the account is or me-school do the following
    try {
        if (req.body.account_type == labels_1.ACCOUNT_LABEL.me_school) {
            const currentSession = yield sessionModel_1.default.findOne({
                activeSession: true,
            });
            const currentTerm = yield termModel_1.default.findOne({ activeTerm: true });
            req.body.currentSession = currentSession._id;
            req.body.currentTerm = currentTerm._id;
        }
        yield user_1.default.create(req.body);
        res.json({ message: `New ${req.body.role} created` });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.FIND_USER = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.params.id);
    res.json({ user });
}));
