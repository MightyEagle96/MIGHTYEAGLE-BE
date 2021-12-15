"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ratingSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Store' },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    created_at: { type: Date, default: Date.now() },
});
exports.default = mongoose_1.model('Rating', ratingSchema);
