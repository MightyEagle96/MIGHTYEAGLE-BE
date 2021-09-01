"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
var catchAsync = function (theFunc) {
    return function (req, res, next) {
        theFunc(req, res, next).catch(next);
    };
};
exports.catchAsync = catchAsync;
