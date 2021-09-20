"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var examsTakenSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    examsTaken: [
        {
            codeName: String,
            currentClass: String,
            currentTerm: String,
            testType: String,
            dateTaken: { type: Date, default: Date.now() },
        },
    ],
});
exports.default = mongoose_1.model('ExamsTaken', examsTakenSchema);
