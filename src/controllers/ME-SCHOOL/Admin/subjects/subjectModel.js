"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var subjectSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: [true, 'This subject already exists'],
        trim: true,
    },
    category: { type: String, enum: ['junior', 'senior', 'both'] },
});
exports.default = mongoose_1.model('Subject', subjectSchema);
