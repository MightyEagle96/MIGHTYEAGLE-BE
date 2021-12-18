"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const storeSchema = new mongoose_1.Schema({
    name: { type: String, trim: true },
    quantity: { type: Number, default: 0 },
    price: { type: Number },
    expirationDate: { type: Date },
    available: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
});
storeSchema.pre('save', function (next) {
    if (this.quantity > 0) {
        this.available = true;
    }
    next();
});
exports.default = mongoose_1.model('StoreManager', storeSchema);
