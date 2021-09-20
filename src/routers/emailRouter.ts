import express from 'express';
import { SendEmail } from '../controllers/ME-STORES/Email/EmailController';

const emailRouter = express.Router();

emailRouter.post('/', SendEmail);

export default emailRouter;
