import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { router } from './src/routers/voterRouter';
import authRouter from './src/routers/authRouter';
import { errorHandler } from './src/controllers/errorController';
import { userRouter } from './src/routers/userRouter';
import { causeRouter } from './src/routers/causeRouter';
import { originUrl } from './src/utils/services';
import donationRouter from './src/routers/donationRouter';
import patientRouter from './src/routers/medi-tec/patientRouter';
import deliveryRouter from './src/routers/medi-tec/deliveryRouter';
import recordRouter from './src/routers/medi-tec/recordRouter';
import wardRouter from './src/routers/medi-tec/wardRouter';
import storeRouter from './src/routers/me-store/storeRouter';
import cartRouter from './src/routers/me-store/cartRouter';
import favoriteRouter from './src/routers/me-store/favoriteRouter';

const app = express();
const limiter = rateLimit({ windowMs: 2 * 60 * 1000, max: 10 });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
//app.use(limiter);
app.use(cors({ origin: originUrl, credentials: true }));

app
  .use('/auth', authRouter)
  .use('/voters', router)
  .use('/users', userRouter)
  .use('/causes', causeRouter)
  .use('/patients', patientRouter)
  .use('/deliveries', deliveryRouter)
  .use('/records', recordRouter)
  .use('/ward', wardRouter)
  .use('/stores', storeRouter)
  .use('/cart', cartRouter)
  .use('/favorite', favoriteRouter)
  .use('/donation', donationRouter);

app.use(errorHandler);
export { app };
