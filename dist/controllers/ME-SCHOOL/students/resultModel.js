"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const resultSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    term: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Term' },
    testType: { type: mongoose_1.Schema.Types.ObjectId, ref: 'TestType' },
    subject: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Subject' },
    session: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Session' },
    level: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Level' },
    score: Number,
});
exports.default = mongoose_1.model('Result', resultSchema);
