"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var sessionSchema = new mongoose_1.Schema({
    session: {
        type: String,
        unique: [true, 'This subject already exists'],
        trim: true,
    },
});
exports.default = mongoose_1.model('Session', sessionSchema);
