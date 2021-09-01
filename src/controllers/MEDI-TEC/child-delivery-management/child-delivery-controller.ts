import { catchAsync } from '../../../shared/catchAsync';
import recordModel from '../records/record-model';
import ChildDelivery from './child-delivery-model';

export const CREATE_DELIVERY = catchAsync(async (req: any, res: any) => {
  //run a validation on the genders array
  console.log(req.body);
  const { patient } = req.body;
  const delivery = await ChildDelivery.create(req.body);
  const record = { recordType: 'delivery', reference: delivery._id };
  await recordModel.findOneAndUpdate(
    { patient: patient },
    { $push: { data: record } }
  );
  res.status(201).json({ delivery });
});

export const GET_DELIVERIES = catchAsync(async (req: any, res: any) => {
  const deliveries = await ChildDelivery.find(req.query).populate('patient', {
    fullName: 1,
  });
  res.json({ deliveries });
});

export const GET_DELIVERY = catchAsync(async (req: any, res: any) => {
  const delivery = await ChildDelivery.findById(req.params.id);
  res.json({ delivery });
});

export const DELETE_DELIVERY = catchAsync(async (req: any, res: any) => {
  await ChildDelivery.findByIdAndDelete(req.params.id);

  //remove the delivery from the record

  res.json({ message: 'Delivery Deleted' });
});
