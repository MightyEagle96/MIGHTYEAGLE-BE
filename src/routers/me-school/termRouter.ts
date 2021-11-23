import express from 'express';
import {
  ActiveTerm,
  CreateCurrentTerm,
  ListTerms,
  UpdateTerm,
} from '../../controllers/ME-SCHOOL/Admin/termHandler/termController';
import { IsLoggedIn, RestrictTo } from '../../services/user.service';

const termRouter = express.Router();

termRouter
  .post('/create', IsLoggedIn, RestrictTo('admin'), CreateCurrentTerm)
  .get('/view', ListTerms)
  .patch('/update/:id', UpdateTerm)
  .get('/activeTerm', ActiveTerm);

export default termRouter;
