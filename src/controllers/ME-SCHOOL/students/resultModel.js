"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var resultSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    level: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Level' },
    currentTerm: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Term' },
    currentSession: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Session' },
    subject: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Subject' },
    results: [
        {
            testType: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'TestType',
                unique: [true, 'You cannot create same type of test'],
            },
            score: Number,
        },
    ],
});
exports.default = mongoose_1.model('Result', resultSchema);
