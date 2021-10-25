import express from 'express';
import {
  CreateCurrentTerm,
  ListTerms,
} from '../../controllers/ME-SCHOOL/Admin/termHandler/termController';

const termRouter = express.Router();

termRouter.post('/create', CreateCurrentTerm);
termRouter.get('/view', ListTerms);

export default termRouter;
