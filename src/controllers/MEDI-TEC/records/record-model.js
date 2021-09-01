"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var recordSchema = new mongoose_1.Schema({
    patient: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Patient' },
    data: [
        {
            recordType: String,
            createdAt: { type: Date, default: Date.now() },
            reference: String,
        },
    ],
});
exports.default = mongoose_1.model('Record', recordSchema);
