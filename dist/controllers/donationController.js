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
exports.MakeDonation = void 0;
const donation_1 = __importDefault(require("../models/donation"));
const catchAsync_1 = require("../shared/catchAsync");
//make a donation
exports.MakeDonation = catchAsync_1.catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cause = req.params.causeId;
    const { _id } = req.user;
    const { amountDonated } = req.body;
    const newDonation = {
        donor: _id,
        amountDonated,
    };
    const donation = yield donation_1.default.findOneAndUpdate({ cause }, { $push: { donations: newDonation } });
    //const donation = await Donation.findOne({ cause });
    res.send(donation);
}));
