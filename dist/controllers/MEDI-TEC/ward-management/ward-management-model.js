"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const wardSchema = new mongoose_1.Schema({
    patient: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Patient' },
    ward: {
        type: String,
        enum: ['male', 'female', 'children', 'maternity', 'emergency'],
    },
    date_admitted: { type: Date, default: Date.now() },
    date_discharged: Date,
});
exports.default = mongoose_1.model('Ward', wardSchema);
