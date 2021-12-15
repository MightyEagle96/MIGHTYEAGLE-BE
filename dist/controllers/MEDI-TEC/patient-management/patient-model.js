"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const patientSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    fullName: String,
    genotype: {
        type: String,
        enum: ['AA', 'AS', 'SS'],
        required: [true, 'Genotype is required'],
    },
    bloodGroup: {
        type: String,
        enum: ['A', 'B', 'AB', 'O'],
        required: [true, 'Blood group is required'],
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: [true, 'Gender is required'],
    },
    phoneNumber: String,
    address: String,
    next_of_kin: String,
    next_of_kin_phoneNumber: String,
    isAdmitted: { type: Boolean, default: false },
    previousAppointment: Date,
    nextAppointment: Date,
    date_of_birth: String,
    marital_status: {
        type: String,
        enum: ['single', 'married', 'divorced', 'widowed', 'widowered'],
    },
    timeStamps: {
        createdAt: { type: String, default: new Date() },
        updateAt: String,
    },
});
patientSchema.pre('save', function (next) {
    this.fullName = `${this.firstName} ${this.lastName}`;
    next();
});
exports.default = mongoose_1.model('Patient', patientSchema);
