"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var questionSchema = new mongoose_1.Schema({
    currentClass: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Level' },
    currentTerm: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Term' },
    subject: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Subject' },
    testType: { type: mongoose_1.Schema.Types.ObjectId, ref: 'TestType' },
    questions: [
        {
            question: String,
            optionA: String,
            optionB: String,
            optionC: String,
            optionD: String,
            optionE: String,
            correctAns: String,
        },
    ],
});
exports.default = mongoose_1.model('Question', questionSchema);
