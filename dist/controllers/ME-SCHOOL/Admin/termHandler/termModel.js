"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const termSchema = new mongoose_1.Schema({
    term: {
        type: String,
        unique: [true, 'This term already exists'],
        trim: true,
    },
    activeTerm: { type: Boolean, default: true },
});
exports.default = mongoose_1.model('CurrentTerm', termSchema);
