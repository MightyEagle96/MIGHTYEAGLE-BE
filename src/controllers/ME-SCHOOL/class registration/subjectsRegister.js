"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var subjectRegister = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    level: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Level' },
    subjects: [{ subject: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Subject' } }],
});
exports.default = mongoose_1.model('SubjectRegister', subjectRegister);
