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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_PATIENT = exports.CREATE_PATIENT = exports.UPDATE_PATIENT = exports.GET_PATIENT = exports.GET_PATIENTS = void 0;
var catchAsync_1 = require("../../../shared/catchAsync");
var patient_model_1 = __importDefault(require("./patient-model"));
var record_model_1 = __importDefault(require("../records/record-model"));
var child_delivery_model_1 = __importDefault(require("../child-delivery-management/child-delivery-model"));
//Get patients
exports.GET_PATIENTS = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var patients;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, patient_model_1.default.find(req.query)];
            case 1:
                patients = _a.sent();
                res.json({ results: patients.length, patients: patients });
                return [2 /*return*/];
        }
    });
}); });
//Get patients
exports.GET_PATIENT = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var patient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, patient_model_1.default.findById(req.params.id)];
            case 1:
                patient = _a.sent();
                res.json({ patient: patient });
                return [2 /*return*/];
        }
    });
}); });
//Edit patients
exports.UPDATE_PATIENT = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var patient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, patient_model_1.default.findOneAndUpdate({
                    _id: req.params.id,
                    body: req.body,
                })];
            case 1:
                patient = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//Create patient
exports.CREATE_PATIENT = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var patient, record;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, patient_model_1.default.create(req.body)];
            case 1:
                patient = _a.sent();
                record = { patient: patient._id };
                return [4 /*yield*/, record_model_1.default.create(record)];
            case 2:
                _a.sent();
                res.status(201).json({ patient: patient });
                return [2 /*return*/];
        }
    });
}); });
//Delete patient
exports.DELETE_PATIENT = catchAsync_1.catchAsync(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            //when a patient is created everything is deleted
            return [4 /*yield*/, patient_model_1.default.findByIdAndDelete(req.params.id)];
            case 1:
                //when a patient is created everything is deleted
                _a.sent();
                return [4 /*yield*/, record_model_1.default.findOneAndDelete({ patient: req.params.id })];
            case 2:
                _a.sent();
                return [4 /*yield*/, child_delivery_model_1.default.findOneAndDelete({ mother: req.params.id })];
            case 3:
                _a.sent();
                res.json({ message: 'Patient deleted' });
                return [2 /*return*/];
        }
    });
}); });
