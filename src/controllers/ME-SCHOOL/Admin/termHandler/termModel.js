"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var termSchema = new mongoose_1.Schema({
    term: {
        type: String,
        unique: [true, 'This term already exists'],
        trim: true,
    },
    activeTerm: { type: Boolean, default: true },
});
exports.default = mongoose_1.model('CurrentTerm', termSchema);
