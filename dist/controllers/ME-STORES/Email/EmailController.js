"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
exports.SendEmail = catchAsync_1.catchAsync((req, res) => {
    res.send('success oo');
});
