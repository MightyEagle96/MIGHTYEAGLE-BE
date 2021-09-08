import mongoose, { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { stringify } from 'querystring';

export interface UserInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  state: string;
  lga: string;
  address: string;
  phoneNumber: string;
  role: string;
  timeStamps: { createdAt: string; updatedAt: string };
  refreshToken: string;
}

export interface UserDocument extends UserInput, Document {
  fullName: String;
  comparePasswords(candidatePassword: boolean): Promise<boolean>;
}
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullName: String,
  email: {
    type: String,
    unique: [true, 'Email address already exists'],
    lowerCase: true,
    required: true,
  },
  password: { type: String, required: true },
  dateOfBirth: String,
  state: String,
  lga: String,
  address: String,
  phoneNumber: String,
  role: {
    type: String,
    enum: [
      'user',
      'staff',
      'admin',
      'storeAdmin',
      'doctor',
      'nurse',
      'patient',
      'student',
      'teacher',
      'classTeacher',
    ],
    default: 'user',
  },
  account_type: {
    type: String,
    enum: ['me-school', 'medi-tec', 'me-stores'],
  },
  medical_department: String,
  //  referralId: { type: Schema.Types.ObjectId, ref: 'Account' },
  timeStamps: {
    createdAt: { type: String, default: Date.now() },
    updatedAt: String,
  },
  refreshToken: String,
});

//to create a virtual method
userSchema.virtual('fullname').get(function (this: UserDocument) {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre(
  'save',
  async function (this: UserDocument, next: mongoose.HookNextFunction) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
);
userSchema.pre('save', function (this: any, next: mongoose.HookNextFunction) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});

userSchema.methods.comparePasswords = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

export default model('User', userSchema);
