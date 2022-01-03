"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const centerReportSchema = new mongoose_1.Schema({
    center: { type: mongoose_1.Schema.Types.ObjectId, ref: 'JambCenter' },
    report: { type: Array },
});
exports.default = mongoose_1.model('CenterReport', centerReportSchema);
