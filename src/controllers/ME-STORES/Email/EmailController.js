"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmail = void 0;
var catchAsync_1 = require("../../../shared/catchAsync");
exports.SendEmail = catchAsync_1.catchAsync(function (req, res) {
    res.send('success oo');
});
