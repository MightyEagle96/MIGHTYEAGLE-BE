"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const voterSchema = new mongoose_1.default.Schema({
    name: String,
    dateOfBirth: String,
    maritalStatus: String,
    stateOfOrigin: String,
    localGovernmentArea: String,
    email: { type: String, unique: [true, 'Email address already in use'] },
});
const Voter = mongoose_1.default.model('Voter', voterSchema);
exports.default = Voter;
