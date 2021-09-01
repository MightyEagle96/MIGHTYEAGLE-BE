import { catchAsync } from '../../../shared/catchAsync';
import Patient from './patient-model';
import Record from '../records/record-model';
import childDeliveryModel from '../child-delivery-management/child-delivery-model';

//Get patients
export const GET_PATIENTS = catchAsync(async (req: any, res: any) => {
  const patients = await Patient.find(req.query);
  res.json({ results: patients.length, patients });
});
//Get patients
export const GET_PATIENT = catchAsync(async (req: any, res: any) => {
  const patient = await Patient.findById(req.params.id);
  res.json({ patient });
});
//Edit patients
export const UPDATE_PATIENT = catchAsync(async (req: any, res: any) => {
  const patient = await Patient.findOneAndUpdate({
    _id: req.params.id,
    body: req.body,
  });
});
//Create patient
export const CREATE_PATIENT = catchAsync(async (req: any, res: any) => {
  const patient = await Patient.create(req.body);
  //after creating a new patient, create a new record for the patient
  const record = { patient: patient._id };
  await Record.create(record);

  res.status(201).json({ patient });
});
//Delete patient
export const DELETE_PATIENT = catchAsync(async (req: any, res: any) => {
  //when a patient is created everything is deleted
  await Patient.findByIdAndDelete(req.params.id);
  await Record.findOneAndDelete({ patient: req.params.id });
  await childDeliveryModel.findOneAndDelete({ mother: req.params.id });
  res.json({ message: 'Patient deleted' });
});
