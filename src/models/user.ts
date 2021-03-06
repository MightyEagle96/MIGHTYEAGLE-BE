import mongoose, { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { stringify } from 'querystring';
import { ACCOUNT_LABEL } from '../utils/labels';

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
  imageUrl: string;
  gender: string;
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
  dateOfBirth: { type: Date },
  state: String,
  lga: String,
  address: String,
  phoneNumber: String,
  imageUrl: String,
  gender: String,
  role: {
    type: String,
    enum: [
      'user',
      'staff',
      'admin',
      'store admin',
      'doctor',
      'nurse',
      'patient',
      'student',
      'teacher',
      'class teacher',
    ],
    default: 'user',
  },
  account_type: {
    type: String,
    enum: [
      ACCOUNT_LABEL.me_school,
      ACCOUNT_LABEL.me_stores,
      ACCOUNT_LABEL.medi_tec,
    ],
  },
  isNewAccount: { type: Boolean, default: true },
  medical_department: String,
  isAgent: Boolean,
  //  referralId: { type: Schema.Types.ObjectId, ref: 'Account' },
  timeStamps: {
    createdAt: { type: String, default: Date.now() },
    updatedAt: String,
  },
  refreshToken: String,
  currentTerm: { type: Schema.Types.ObjectId, ref: 'CurrentTerm' },
  level: { type: Schema.Types.ObjectId, ref: 'Level' },
  currentSession: { type: Schema.Types.ObjectId, ref: 'Session' },
  devicePlatform: { os: String, version: String },
});

//to create a virtual method
userSchema.virtual('fullname').get(function (this: UserDocument) {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre(
  'save',
  function (this: UserDocument, next: mongoose.HookNextFunction) {
    if (this.gender === 'male') {
      this.imageUrl = 'maleDefault.png';
    } else if (this.gender === 'female') {
      this.imageUrl = 'femaleDefault.jpeg';
    } else {
      this.imageUrl = 'defaultAvatar.png';
    }
    next();
  }
);
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
