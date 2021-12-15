"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subjectRegister = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    level: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Level' },
    currentTerm: { type: mongoose_1.Schema.Types.ObjectId, ref: 'CurrentTerm' },
    session: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Session' },
    subjects: [{ subject: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Subject' } }],
});
exports.default = mongoose_1.model('SubjectRegister', subjectRegister);
