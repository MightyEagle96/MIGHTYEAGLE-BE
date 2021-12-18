import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import multer from 'multer';

import { router } from './routers/voterRouter';
import authRouter from './routers/authRouter';
import { errorHandler } from './controllers/errorController';
import { userRouter } from './routers/userRouter';
import { causeRouter } from './routers/causeRouter';
import { originUrl } from './utils/services';
import donationRouter from './routers/donationRouter';
import patientRouter from './routers/medi-tec/patientRouter';
import deliveryRouter from './routers/medi-tec/deliveryRouter';
import recordRouter from './routers/medi-tec/recordRouter';
import wardRouter from './routers/medi-tec/wardRouter';
import storeRouter from './routers/me-store/storeRouter';
import cartRouter from './routers/me-store/cartRouter';
import favoriteRouter from './routers/me-store/favoriteRouter';
import orderRouter from './routers/me-store/orderRouter';
import agentRouter from './routers/me-store/agentRouter';
import successRouter from './routers/successRouter';
import emailRouter from './routers/emailRouter';
import ratingRouter from './routers/me-store/ratingRouter';
import examsTakenRouter from './routers/me-school/examTakenRouter';
import subjectRouter from './routers/me-school/Admin/subjectsRouter';
import levelRouter from './routers/me-school/levelRouter';
import termRouter from './routers/me-school/termRouter';
import testTypeRouter from './routers/me-school/testTypeRouter';
import questionRouter from './routers/me-school/questionRouter';
import sessionRouter from './routers/me-school/sessionRouter';
import subjectRegistrationRouter from './routers/me-school/Students/subjectRegistrationRouter';
import adminRouter from './routers/me-school/Admin/adminRouter';
import studentRouter from './routers/me-school/Students/studentRouter';
import classTeacherRouter from './routers/me-school/TeacherClassTeacher/classTeacherRouter';
import teacherSubjectAssignmentRouter from './routers/me-school/Academics/teacherSubjectAssignmentRouter';
import studentsPerformanceRouter from './routers/me-school/Academics/studentsPerformanceRouter';
import storeManagementRouter from './routers/me-school/Store/StoreManagementRouter';

//import unirest from 'unirest';

const app = express();
const limiter = rateLimit({ windowMs: 2 * 60 * 1000, max: 10 });
const imageUpload = multer({ dest: 'public/images' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static('public'));
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
  .use('/session', sessionRouter)
  .use('/testType', testTypeRouter)
  .use('/questions', questionRouter)
  .use('/subjectRegistration', subjectRegistrationRouter)
  .use('/classTeacher', classTeacherRouter)
  .use('/school/admin', adminRouter)
  .use('/student', studentRouter)
  .use('/academics', teacherSubjectAssignmentRouter)
  .use('/academics', studentsPerformanceRouter)
  .use('/store', storeManagementRouter)
  .use('/*', (req: any, res: any) => {
    res.status(404).json({ message: "Can't find this route on this server" });
  });
app.use(errorHandler);
export { app };
