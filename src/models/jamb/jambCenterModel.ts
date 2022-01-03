import mongoose, { model, Schema } from 'mongoose';
import { randomUUID } from 'crypto';

const jambCenterSchema = new Schema({
  centerName: { type: String },
  registrationNumber: { type: String, unique: true, lowercase: true },
  state: { type: String },
  localGovernmentArea: { type: String },
  address: { type: String },
  computers: { type: Number },
  backupComputers: { type: Number },
});

jambCenterSchema.pre(
  'save',
  function (this: any, next: mongoose.HookNextFunction) {
    try {
      const uuid = randomUUID().split('-')[0];
      this.registrationNumber = `JAMB-${uuid}`;
    } catch (error) {
      const uuid = randomUUID().split('-')[0];
      this.registrationNumber = `JAMB-${uuid}`;
    }
    next();
  }
);

export default model('JambCenter', jambCenterSchema);
