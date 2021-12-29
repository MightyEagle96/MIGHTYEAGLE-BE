"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const labels_1 = require("../../../../utils/labels");
const subjectSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: [true, 'This subject already exists'],
        trim: true,
    },
    category: {
        type: String,
        enum: [labels_1.JUNIOR_LABEL, labels_1.SENIOR_LABEL, labels_1.BOTH_LABEL],
        required: true,
    },
});
subjectSchema.pre('find', function (next) {
    // this.where({})
    next();
});
exports.default = mongoose_1.model('Subject', subjectSchema);
