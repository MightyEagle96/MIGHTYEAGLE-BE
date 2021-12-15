"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    otherName: String,
    centerNumber: String,
    email: String,
    phoneNumber: String,
    subjectCombination: [{ type: String }],
    uploadedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
});
exports.default = mongoose_1.model('Verificaton', schema);
