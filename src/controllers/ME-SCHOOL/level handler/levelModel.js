"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var levelSchema = new mongoose_1.Schema({
    level: {
        type: String,
        unique: [true, 'This level already exists'],
        trim: true,
    },
});
exports.default = mongoose_1.model('Level', levelSchema);
