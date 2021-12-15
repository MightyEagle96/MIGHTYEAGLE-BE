"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const labels_1 = require("../utils/labels");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: String,
    email: {
        type: String,
        unique: [true, 'Email address already exists'],
        lowerCase: true,
        required: true,
    },
    password: { type: String, required: true },
    dateOfBirth: { type: Date },
    state: String,
    lga: String,
    address: String,
    phoneNumber: String,
    imageUrl: String,
    gender: String,
    role: {
        type: String,
        enum: [
            'user',
            'staff',
            'admin',
            'store admin',
            'doctor',
            'nurse',
            'patient',
            'student',
            'teacher',
            'class teacher',
        ],
        default: 'user',
    },
    account_type: {
        type: String,
        enum: [
            labels_1.ACCOUNT_LABEL.me_school,
            labels_1.ACCOUNT_LABEL.me_stores,
            labels_1.ACCOUNT_LABEL.medi_tec,
        ],
    },
    isNewAccount: { type: Boolean, default: true },
    medical_department: String,
    isAgent: Boolean,
    //  referralId: { type: Schema.Types.ObjectId, ref: 'Account' },
    timeStamps: {
        createdAt: { type: String, default: Date.now() },
        updatedAt: String,
    },
    refreshToken: String,
    currentTerm: { type: mongoose_1.Schema.Types.ObjectId, ref: 'CurrentTerm' },
    level: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Level' },
    currentSession: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Session' },
    devicePlatform: { os: String, version: String },
});
//to create a virtual method
userSchema.virtual('fullname').get(function () {
    return `${this.firstName} ${this.lastName}`;
});
userSchema.pre('save', function (next) {
    if (this.gender === 'male') {
        this.imageUrl = 'maleDefault.png';
    }
    else if (this.gender === 'female') {
        this.imageUrl = 'femaleDefault.jpeg';
    }
    else {
        this.imageUrl = 'defaultAvatar.png';
    }
    next();
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, 12);
        next();
    });
});
userSchema.pre('save', function (next) {
    this.fullName = `${this.firstName} ${this.lastName}`;
    next();
});
userSchema.methods.comparePasswords = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        return bcrypt_1.default.compare(candidatePassword, user.password).catch((e) => false);
    });
};
exports.default = mongoose_1.model('User', userSchema);
