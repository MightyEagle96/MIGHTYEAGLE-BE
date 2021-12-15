"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const catchAsync = (theFunc) => {
    return (req, res, next) => {
        theFunc(req, res, next).catch(next);
    };
};
exports.catchAsync = catchAsync;
