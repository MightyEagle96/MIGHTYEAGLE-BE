import mongoose, { Schema, model, Document } from 'mongoose';

const patientSchema = new Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  genotype: {
    type: String,
    enum: ['AA', 'AS', 'SS'],
    required: [true, 'Genotype is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A', 'B', 'AB', 'O'],
    required: [true, 'Blood group is required'],
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Gender is required'],
  },
  phoneNumber: String,
  address: String,
  next_of_kin: String,
  next_of_kin_phoneNumber: String,
  isAdmitted: { type: Boolean, default: false },
  previousAppointment: Date,
  nextAppointment: Date,
  date_of_birth: String,
  marital_status: {
    type: String,
    enum: ['single', 'married', 'divorced', 'widowed', 'widowered'],
  },
  timeStamps: {
    createdAt: { type: String, default: new Date() },
    updateAt: String,
  },
});

patientSchema.pre(
  'save',
  function (this: any, next: mongoose.HookNextFunction) {
    this.fullName = `${this.firstName} ${this.lastName}`;
    next();
  }
);
export default model('Patient', patientSchema);
