"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderedProductSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Store' },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    quantity: Number,
    txRef: Number,
    status: String,
    transaction_id: Date,
    deliveryStatus: {
        type: String,
        enum: ['awaiting fulfillment', 'shipped', 'fulfilled'],
    },
    date_ordered: { type: Date, default: Date.now() },
});
exports.default = mongoose_1.model('OrderedProducts', orderedProductSchema);
