"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var app_1 = require("./app");
dotenv_1.default.config({ path: '.env' });
var DATABASE = process.env.DATABASE || '';
var DATABASE_LOCAL = process.env.DATABASE_LOCAL || '';
mongoose_1.default
    .connect(DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(function () {
    console.log('DB Connected successfully');
})
    .catch(function (e) {
    console.log('DB could not connect at this time');
    process.exit(1);
});
var port = process.env.PORT || 4000;
app_1.app.listen(port, function () {
    console.log(port + " is listening");
});
