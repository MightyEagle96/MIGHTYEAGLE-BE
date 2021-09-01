import Voter from '../models/voterModel';

//create a voter
export const CreateVoter = async (req: any, res: any) => {
  await Voter.create(req.body);
  res.sendStatus(201);
};

// Get the voters
export const GetVoters = async (req: any, res: any) => {
  const voters = await Voter.find();
  res.json(voters);
};

//Get a single voter
export const GetVoter = async (req: any, res: any) => {
  const voter = await Voter.findById(req.params._id);
  res.json(voter);
};

//Update a voter
export const UpdateVoter = async (req: any, res: any) => {
  const voter = await Voter.findByIdAndUpdate(req.params._id, req.body);
  res.json(voter);
};

//Delete a voter
export const DeleteVoter = async (req: any, res: any) => {
  await Voter.findByIdAndDelete(req.prarams._id);
  res.sendStatus(200);
};
