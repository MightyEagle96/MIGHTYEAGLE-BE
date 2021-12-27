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
exports.ViewUsers = void 0;
const user_1 = __importDefault(require("../../../../models/user"));
const catchAsync_1 = require("../../../../shared/catchAsync");
exports.ViewUsers = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users;
        let length = 0;
        if (req.query.filter === 'ytba') {
            const newQuery = {};
            newQuery.account_type = req.query.account_type;
            newQuery.role = req.query.role;
            newQuery.level = null;
            console.log(newQuery);
            users = yield user_1.default.find(newQuery);
            length = users.length;
        }
        else {
            users = yield user_1.default.find(req.query);
            length = users.length;
        }
        res.json({
            length,
            users: users.sort((a, b) => {
                let fa = a.fullName, fb = b.fullName;
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            }),
        });
    }
    catch (error) {
        console.log(error);
        res.json({ message: 'yawa don gas' });
    }
}));
