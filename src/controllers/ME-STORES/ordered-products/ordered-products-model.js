"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var orderedProductSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Store' },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    amount_paid: { type: Number },
    quantity: { type: Number },
    tx_ref: String,
    status: String,
    date_ordered: { type: Date, default: Date.now() },
});
exports.default = mongoose_1.model('OrderedProducts', orderedProductSchema);
