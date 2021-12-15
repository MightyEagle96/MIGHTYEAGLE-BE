"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
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
const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `An account with that ${field} already exists.`;
    res.status(code).send({ messages: error, fields: field });
};
const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map((el) => el.message);
    let fields = Object.values(err.errors).map((el) => el.path);
    let code = 400;
    if (errors.length > 1) {
        const formattedErrors = errors.join(' ');
        res.status(code).send({ messages: formattedErrors, fields });
    }
    else {
        res.status(code).send({ messages: errors, fields });
    }
};
