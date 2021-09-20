import express from 'express';
import {
  CreateCurrentTerm,
  ListTerms,
} from '../../controllers/ME-SCHOOL/termHandler/termController';

const termRouter = express.Router();

termRouter.post('/', CreateCurrentTerm);
termRouter.get('/', ListTerms);

export default termRouter;
