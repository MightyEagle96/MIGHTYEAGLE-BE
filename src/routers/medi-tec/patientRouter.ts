import express from 'express';
import {
  CREATE_PATIENT,
  DELETE_PATIENT,
  GET_PATIENT,
  GET_PATIENTS,
} from '../../controllers/MEDI-TEC/patient-management/patient-controller';

const patientRouter = express.Router();

patientRouter.get('/', GET_PATIENTS);
patientRouter.get('/:id', GET_PATIENT);
patientRouter.post('/', CREATE_PATIENT);
patientRouter.delete('/:id', DELETE_PATIENT);

export default patientRouter;
