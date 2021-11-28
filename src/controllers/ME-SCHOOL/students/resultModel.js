"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var resultSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    paper: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Question' },
    session: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Session' },
    score: Number,
});
exports.default = mongoose_1.model('Result', resultSchema);
