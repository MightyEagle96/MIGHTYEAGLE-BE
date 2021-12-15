"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    session: {
        type: String,
        unique: [true, 'This session already exists'],
        trim: true,
    },
    activeSession: { type: Boolean, default: true },
});
exports.default = mongoose_1.model('Session', sessionSchema);
