"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const crypto_1 = require("crypto");
const jambCenterSchema = new mongoose_1.Schema({
    centerName: { type: String },
    registrationNumber: { type: String, unique: true, lowercase: true },
    state: { type: String },
    localGovernmentArea: { type: String },
    address: { type: String },
    computers: { type: Number },
    backupComputers: { type: Number },
    createdOn: { type: Date, default: Date.now() },
});
jambCenterSchema.pre('save', function (next) {
    try {
        const uuid = crypto_1.randomUUID().split('-')[0];
        this.registrationNumber = `JAMB-${uuid}`;
    }
    catch (error) {
        const uuid = crypto_1.randomUUID().split('-')[0];
        this.registrationNumber = `JAMB-${uuid}`;
    }
    next();
});
exports.default = mongoose_1.model('JambCenter', jambCenterSchema);
