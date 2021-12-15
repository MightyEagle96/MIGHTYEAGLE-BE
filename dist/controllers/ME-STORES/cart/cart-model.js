"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    item: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Store' },
});
exports.default = mongoose_1.model('Cart', cartSchema);
