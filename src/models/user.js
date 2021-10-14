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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcrypt_1 = __importDefault(require("bcrypt"));
var userSchema = new mongoose_1.Schema({
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
            'storeAdmin',
            'doctor',
            'nurse',
            'patient',
            'student',
            'teacher',
            'classTeacher',
        ],
        default: 'user',
    },
    account_type: {
        type: String,
        enum: ['me-school', 'medi-tec', 'me-stores'],
    },
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
});
//to create a virtual method
userSchema.virtual('fullname').get(function () {
    return this.firstName + " " + this.lastName;
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = this;
                    return [4 /*yield*/, bcrypt_1.default.hash(this.password, 12)];
                case 1:
                    _a.password = _b.sent();
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
userSchema.pre('save', function (next) {
    this.fullName = this.firstName + " " + this.lastName;
    next();
});
userSchema.methods.comparePasswords = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            user = this;
            return [2 /*return*/, bcrypt_1.default.compare(candidatePassword, user.password).catch(function (e) { return false; })];
        });
    });
};
exports.default = mongoose_1.model('User', userSchema);
