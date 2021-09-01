"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var donationSchema = new mongoose_1.Schema({
    cause: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    donations: [{ donor: mongoose_1.Schema.Types.ObjectId, amountDonated: Number }],
});
var Donation = mongoose_1.model('Donation', donationSchema);
exports.default = Donation;
