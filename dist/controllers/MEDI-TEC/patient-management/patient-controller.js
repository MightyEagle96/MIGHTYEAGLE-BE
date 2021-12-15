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
exports.DELETE_PATIENT = exports.CREATE_PATIENT = exports.UPDATE_PATIENT = exports.GET_PATIENT = exports.GET_PATIENTS = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const patient_model_1 = __importDefault(require("./patient-model"));
const record_model_1 = __importDefault(require("../records/record-model"));
const child_delivery_model_1 = __importDefault(require("../child-delivery-management/child-delivery-model"));
//Get patients
exports.GET_PATIENTS = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield patient_model_1.default.find(req.query);
    res.json({ results: patients.length, patients });
}));
//Get patients
exports.GET_PATIENT = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield patient_model_1.default.findById(req.params.id);
    res.json({ patient });
}));
//Edit patients
exports.UPDATE_PATIENT = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield patient_model_1.default.findOneAndUpdate({
        _id: req.params.id,
        body: req.body,
    });
}));
//Create patient
exports.CREATE_PATIENT = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield patient_model_1.default.create(req.body);
    //after creating a new patient, create a new record for the patient
    const record = { patient: patient._id };
    yield record_model_1.default.create(record);
    res.status(201).json({ patient });
}));
//Delete patient
exports.DELETE_PATIENT = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //when a patient is created everything is deleted
    yield patient_model_1.default.findByIdAndDelete(req.params.id);
    yield record_model_1.default.findOneAndDelete({ patient: req.params.id });
    yield child_delivery_model_1.default.findOneAndDelete({ mother: req.params.id });
    res.json({ message: 'Patient deleted' });
}));
