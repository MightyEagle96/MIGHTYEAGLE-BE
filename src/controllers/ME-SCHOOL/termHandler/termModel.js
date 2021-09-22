"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var currentTermSchema = new mongoose_1.Schema({
    term: {
        type: String,
        unique: [true, 'This term already exists'],
        trim: true,
    },
});
exports.default = mongoose_1.model('CurrentTerm', currentTermSchema);
