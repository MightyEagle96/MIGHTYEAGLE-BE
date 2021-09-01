"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var childDeliverySchma = new mongoose_1.Schema({
    patient: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Patient' },
    number_of_babies: { type: Number, default: 1 },
    gender: [{ type: String, enum: ['f', 'm'] }],
    weight: String,
    date_of_birth: String,
    time_of_birth: String,
    description: String,
});
exports.default = mongoose_1.model('ChildDelivery', childDeliverySchma);
