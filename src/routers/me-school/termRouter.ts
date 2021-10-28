import express from 'express';
import {
  CreateCurrentTerm,
  ListTerms,
  UpdateTerm,
} from '../../controllers/ME-SCHOOL/Admin/termHandler/termController';

const termRouter = express.Router();

termRouter
  .post('/create', CreateCurrentTerm)
  .get('/view', ListTerms)
  .patch('/update/:id', UpdateTerm);

export default termRouter;
