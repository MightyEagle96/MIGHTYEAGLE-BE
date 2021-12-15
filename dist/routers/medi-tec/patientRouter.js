"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patient_controller_1 = require("../../controllers/MEDI-TEC/patient-management/patient-controller");
const patientRouter = express_1.default.Router();
patientRouter.get('/', patient_controller_1.GET_PATIENTS);
patientRouter.get('/:id', patient_controller_1.GET_PATIENT);
patientRouter.post('/', patient_controller_1.CREATE_PATIENT);
patientRouter.delete('/:id', patient_controller_1.DELETE_PATIENT);
exports.default = patientRouter;
