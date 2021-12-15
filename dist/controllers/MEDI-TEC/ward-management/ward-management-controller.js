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
exports.REMOVE_FROM_WARD = exports.ASSIGN_TO_WARD = exports.RETRIEVE_WARD_DATA = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const patient_model_1 = __importDefault(require("../patient-management/patient-model"));
const ward_management_model_1 = __importDefault(require("./ward-management-model"));
exports.RETRIEVE_WARD_DATA = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield ward_management_model_1.default
        .find()
        .populate('patient', { fullName: 1 });
    res.status(200).json({ patients });
}));
exports.ASSIGN_TO_WARD = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate the patient
    // const user = await patientModel.findById(req.body.patient);
    // if(user.gender ==='ma')
    const patient = yield ward_management_model_1.default.create(req.body);
    yield patient_model_1.default.findOneAndUpdate({ _id: req.body.patient }, { isAdmitted: true });
    res.status(201).json({ patient });
}));
exports.REMOVE_FROM_WARD = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
