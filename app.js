"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var voterRouter_1 = require("./src/routers/voterRouter");
var authRouter_1 = __importDefault(require("./src/routers/authRouter"));
var errorController_1 = require("./src/controllers/errorController");
var userRouter_1 = require("./src/routers/userRouter");
var causeRouter_1 = require("./src/routers/causeRouter");
var services_1 = require("./src/utils/services");
var donationRouter_1 = __importDefault(require("./src/routers/donationRouter"));
var patientRouter_1 = __importDefault(require("./src/routers/medi-tec/patientRouter"));
var deliveryRouter_1 = __importDefault(require("./src/routers/medi-tec/deliveryRouter"));
var recordRouter_1 = __importDefault(require("./src/routers/medi-tec/recordRouter"));
var wardRouter_1 = __importDefault(require("./src/routers/medi-tec/wardRouter"));
var storeRouter_1 = __importDefault(require("./src/routers/me-store/storeRouter"));
var app = express_1.default();
exports.app = app;
var limiter = express_rate_limit_1.default({ windowMs: 2 * 60 * 1000, max: 10 });
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.use(morgan_1.default('dev'));
//app.use(limiter);
app.use(cors_1.default({ origin: services_1.originUrl, credentials: true }));
app
    .use('/auth', authRouter_1.default)
    .use('/voters', voterRouter_1.router)
    .use('/users', userRouter_1.userRouter)
    .use('/causes', causeRouter_1.causeRouter)
    .use('/patients', patientRouter_1.default)
    .use('/deliveries', deliveryRouter_1.default)
    .use('/records', recordRouter_1.default)
    .use('/ward', wardRouter_1.default)
    .use('/stores', storeRouter_1.default)
    .use('/donation', donationRouter_1.default);
app.use(errorController_1.errorHandler);
