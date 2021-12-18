"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
dotenv_1.default.config({ path: '.env' });
let DATABASE = process.env.DATABASE || '';
let DATABASE_LOCAL = process.env.DATABASE_LOCAL || '';
mongoose_1.default
    .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
    console.log('DB Connected successfully');
})
    .catch((e) => {
    console.log(e);
    console.log('DB could not connect at this time. Shutting down');
    process.exit(1);
});
const port = process.env.PORT || 4000;
app_1.app.listen(port, () => {
    console.log(`${port} is listening`);
});
