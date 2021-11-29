"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var questionSchema = new mongoose_1.Schema({
    currentClass: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Level' },
    currentTerm: { type: mongoose_1.Schema.Types.ObjectId, ref: 'CurrentTerm' },
    subject: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Subject' },
    testType: { type: mongoose_1.Schema.Types.ObjectId, ref: 'TestType' },
    duration: { type: Number, default: 0 },
    activated: { type: Boolean, default: false },
    questions: [
        {
            question: { type: String, trim: true },
            optionA: { type: String, trim: true },
            optionB: { type: String, trim: true },
            optionC: { type: String, trim: true },
            optionD: { type: String, trim: true },
            optionE: { type: String, trim: true },
            correctAns: { type: String, trim: true },
        },
    ],
});
exports.default = mongoose_1.model('Question', questionSchema);
