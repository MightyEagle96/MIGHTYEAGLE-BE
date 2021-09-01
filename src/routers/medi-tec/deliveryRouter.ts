import express from 'express';
import {
  CREATE_DELIVERY,
  DELETE_DELIVERY,
  GET_DELIVERIES,
  GET_DELIVERY,
} from '../../controllers/MEDI-TEC/child-delivery-management/child-delivery-controller';

const deliveryRouter = express.Router();

deliveryRouter.post('/', CREATE_DELIVERY);
deliveryRouter.get('/', GET_DELIVERIES);
deliveryRouter.get('/:id', GET_DELIVERY);
deliveryRouter.delete('/:id', DELETE_DELIVERY);

export default deliveryRouter;
