"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const multer_1 = __importDefault(require("multer"));
const voterRouter_1 = require("./routers/voterRouter");
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const errorController_1 = require("./controllers/errorController");
const userRouter_1 = require("./routers/userRouter");
const causeRouter_1 = require("./routers/causeRouter");
const services_1 = require("./utils/services");
const donationRouter_1 = __importDefault(require("./routers/donationRouter"));
const patientRouter_1 = __importDefault(require("./routers/medi-tec/patientRouter"));
const deliveryRouter_1 = __importDefault(require("./routers/medi-tec/deliveryRouter"));
const recordRouter_1 = __importDefault(require("./routers/medi-tec/recordRouter"));
const wardRouter_1 = __importDefault(require("./routers/medi-tec/wardRouter"));
const storeRouter_1 = __importDefault(require("./routers/me-store/storeRouter"));
const cartRouter_1 = __importDefault(require("./routers/me-store/cartRouter"));
const favoriteRouter_1 = __importDefault(require("./routers/me-store/favoriteRouter"));
const orderRouter_1 = __importDefault(require("./routers/me-store/orderRouter"));
const agentRouter_1 = __importDefault(require("./routers/me-store/agentRouter"));
const successRouter_1 = __importDefault(require("./routers/successRouter"));
const emailRouter_1 = __importDefault(require("./routers/emailRouter"));
const ratingRouter_1 = __importDefault(require("./routers/me-store/ratingRouter"));
const examTakenRouter_1 = __importDefault(require("./routers/me-school/examTakenRouter"));
const subjectsRouter_1 = __importDefault(require("./routers/me-school/Admin/subjectsRouter"));
const levelRouter_1 = __importDefault(require("./routers/me-school/levelRouter"));
const termRouter_1 = __importDefault(require("./routers/me-school/termRouter"));
const testTypeRouter_1 = __importDefault(require("./routers/me-school/testTypeRouter"));
const questionRouter_1 = __importDefault(require("./routers/me-school/questionRouter"));
const sessionRouter_1 = __importDefault(require("./routers/me-school/sessionRouter"));
const subjectRegistrationRouter_1 = __importDefault(require("./routers/me-school/Students/subjectRegistrationRouter"));
const adminRouter_1 = __importDefault(require("./routers/me-school/Admin/adminRouter"));
const studentRouter_1 = __importDefault(require("./routers/me-school/Students/studentRouter"));
const classTeacherRouter_1 = __importDefault(require("./routers/me-school/TeacherClassTeacher/classTeacherRouter"));
const teacherSubjectAssignmentRouter_1 = __importDefault(require("./routers/me-school/Academics/teacherSubjectAssignmentRouter"));
const studentsPerformanceRouter_1 = __importDefault(require("./routers/me-school/Academics/studentsPerformanceRouter"));
const StoreManagementRouter_1 = __importDefault(require("./routers/me-school/Store/StoreManagementRouter"));
const GraduationRouter_1 = __importDefault(require("./routers/me-school/Academics/GraduationRouter"));
const jambRouter_1 = __importDefault(require("./routers/jamb/jambRouter"));
//import unirest from 'unirest';
const app = express_1.default();
exports.app = app;
const limiter = express_rate_limit_1.default({ windowMs: 2 * 60 * 1000, max: 10 });
const imageUpload = multer_1.default({ dest: 'public/images' });
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
app.use(express_1.default.static('public'));
app.use(cors_1.default({ origin: services_1.originUrl, credentials: true }));
app
    .use('/', successRouter_1.default)
    .use('/email', emailRouter_1.default)
    .use('/auth', authRouter_1.default)
    .use('/voters', voterRouter_1.router)
    .use('/users', userRouter_1.userRouter)
    .use('/causes', causeRouter_1.causeRouter)
    .use('/patients', patientRouter_1.default)
    .use('/deliveries', deliveryRouter_1.default)
    .use('/records', recordRouter_1.default)
    .use('/ward', wardRouter_1.default)
    .use('/stores', storeRouter_1.default)
    .use('/cart', cartRouter_1.default)
    .use('/favorite', favoriteRouter_1.default)
    .use('/order', orderRouter_1.default)
    .use('/donation', donationRouter_1.default)
    .use('/agents', agentRouter_1.default)
    .use('/rating', ratingRouter_1.default)
    .use('/takeExams', examTakenRouter_1.default)
    .use('/subjects', subjectsRouter_1.default)
    .use('/levels', levelRouter_1.default)
    .use('/terms', termRouter_1.default)
    .use('/session', sessionRouter_1.default)
    .use('/testType', testTypeRouter_1.default)
    .use('/questions', questionRouter_1.default)
    .use('/subjectRegistration', subjectRegistrationRouter_1.default)
    .use('/classTeacher', classTeacherRouter_1.default)
    .use('/school/admin', adminRouter_1.default)
    .use('/student', studentRouter_1.default)
    .use('/academics', teacherSubjectAssignmentRouter_1.default)
    .use('/academics', studentsPerformanceRouter_1.default)
    .use('/academics', GraduationRouter_1.default)
    .use('/store', StoreManagementRouter_1.default)
    .use('/jamb', jambRouter_1.default)
    .use('/*', (req, res) => {
    res.status(404).json({ message: "Can't find this route on this server" });
});
app.use(errorController_1.errorHandler);
