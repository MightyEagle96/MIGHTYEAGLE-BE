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
import orderRouter from './src/routers/me-store/orderRouter';
import agentRouter from './src/routers/me-store/agentRouter';
import successRouter from './src/routers/successRouter';
import emailRouter from './src/routers/emailRouter';
import ratingRouter from './src/routers/me-store/ratingRouter';
import examsTakenRouter from './src/routers/me-school/examTakenRouter';
import subjectRouter from './src/routers/me-school/subjectsRouter';
import levelRouter from './src/routers/me-school/levelRouter';
import termRouter from './src/routers/me-school/termRouter';
import testTypeRouter from './src/routers/me-school/testTypeRouter';
import questionRouter from './src/routers/me-school/questionRouter';
//import unirest from 'unirest';

const app = express();
const limiter = rateLimit({ windowMs: 2 * 60 * 1000, max: 10 });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
//app.use(limiter);
app.use(cors({ origin: originUrl, credentials: true }));

app
  .use('/', successRouter)
  .use('/email', emailRouter)
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
  .use('/order', orderRouter)
  .use('/donation', donationRouter)
  .use('/agents', agentRouter)
  .use('/rating', ratingRouter)
  .use('/takeExams', examsTakenRouter)
  .use('/subjects', subjectRouter)
  .use('/levels', levelRouter)
  .use('/terms', termRouter)
  .use('/testType', testTypeRouter)
  .use('/questions', questionRouter)
  .use('/*', (req: any, res: any) => {
    res.status(404).json({ message: "Can't find this route on this server" });
  });

app.use(errorHandler);
export { app };
