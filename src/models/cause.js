"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var causeSchema = new mongoose_1.Schema({
    causeTitle: {
        type: String,
        unique: [true, 'A cause with this same title exists'],
    },
    targetAmount: Number,
    raisedAmount: Number,
    cardImg: String,
    cardText: String,
    linkText: { type: String, default: 'Donate for this cause now' },
    causeDescription: String,
    bannerImg: String,
    subImgs: Array,
    createdAt: { type: String, default: new Date().toLocaleDateString() },
});
var Cause = mongoose_1.model('Cause', causeSchema);
exports.default = Cause;
