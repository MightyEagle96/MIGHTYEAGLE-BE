"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const examsTakenSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    paper: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Question' },
});
exports.default = mongoose_1.model('ExamsTaken', examsTakenSchema);
