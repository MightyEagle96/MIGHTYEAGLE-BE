"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = function (err, req, res, next) {
    try {
        if (err.name === 'ValidationError')
            return (err = handleValidationError(err, res));
        if (err.code && err.code == 11000)
            return (err = handleDuplicateKeyError(err, res));
        else
            res.status(500).send('An unknown error occurred');
    }
    catch (error) {
        res.status(500).send('An unknown error occurred');
    }
};
exports.errorHandler = errorHandler;
var handleDuplicateKeyError = function (err, res) {
    var field = Object.keys(err.keyValue);
    var code = 409;
    var error = "An account with that " + field + " already exists.";
    res.status(code).send({ messages: error, fields: field });
};
var handleValidationError = function (err, res) {
    var errors = Object.values(err.errors).map(function (el) { return el.message; });
    var fields = Object.values(err.errors).map(function (el) { return el.path; });
    var code = 400;
    if (errors.length > 1) {
        var formattedErrors = errors.join(' ');
        res.status(code).send({ messages: formattedErrors, fields: fields });
    }
    else {
        res.status(code).send({ messages: errors, fields: fields });
    }
};
