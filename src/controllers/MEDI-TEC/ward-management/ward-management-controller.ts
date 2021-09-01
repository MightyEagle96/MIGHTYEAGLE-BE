import { catchAsync } from '../../../shared/catchAsync';
import patientModel from '../patient-management/patient-model';
import wardManagementModel from './ward-management-model';

export const RETRIEVE_WARD_DATA = catchAsync(async (req: any, res: any) => {
  const patients = await wardManagementModel
    .find()
    .populate('patient', { fullName: 1 });

  res.status(200).json({ patients });
});

export const ASSIGN_TO_WARD = catchAsync(async (req: any, res: any) => {
  //validate the patient

  // const user = await patientModel.findById(req.body.patient);

  // if(user.gender ==='ma')
  const patient = await wardManagementModel.create(req.body);
  await patientModel.findOneAndUpdate(
    { _id: req.body.patient },
    { isAdmitted: true }
  );
  res.status(201).json({ patient });
});

export const REMOVE_FROM_WARD = catchAsync(async (req: any, res: any) => {});
