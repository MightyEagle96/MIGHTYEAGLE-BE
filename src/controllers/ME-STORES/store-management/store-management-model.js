"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var storeSchema = new mongoose_1.Schema({
    addedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    category: String,
    itemName: { type: String, trim: true },
    description: { type: String, trim: true },
    quantity: { type: Number, default: 1 },
    price: Number,
    out_of_stock: { type: Boolean, default: false },
    imageUrl: { type: String, trim: true },
    dateAdded: { type: Date, default: Date.now() },
});
storeSchema.pre(/^find/, function () {
    this.price /= 100;
});
exports.default = mongoose_1.model('Store', storeSchema);
