"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var testTypeSchema = new mongoose_1.Schema({
    testType: {
        type: String,
        unique: [true, 'This test type already exists'],
        trim: true,
    },
});
exports.default = mongoose_1.model('TestType', testTypeSchema);
