import mongoose from 'mongoose';

const voterSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: String,
  maritalStatus: String,
  stateOfOrigin: String,
  localGovernmentArea: String,
  email: { type: String, unique: [true, 'Email address already in use'] },
});

const Voter = mongoose.model('Voter', voterSchema);
export default Voter;
