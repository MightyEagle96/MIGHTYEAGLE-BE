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
exports.DeleteVoter = exports.UpdateVoter = exports.GetVoter = exports.GetVoters = exports.CreateVoter = void 0;
const voterModel_1 = __importDefault(require("../models/voterModel"));
//create a voter
const CreateVoter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield voterModel_1.default.create(req.body);
    res.sendStatus(201);
});
exports.CreateVoter = CreateVoter;
// Get the voters
const GetVoters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const voters = yield voterModel_1.default.find();
    res.json(voters);
});
exports.GetVoters = GetVoters;
//Get a single voter
const GetVoter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const voter = yield voterModel_1.default.findById(req.params._id);
    res.json(voter);
});
exports.GetVoter = GetVoter;
//Update a voter
const UpdateVoter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const voter = yield voterModel_1.default.findByIdAndUpdate(req.params._id, req.body);
    res.json(voter);
});
exports.UpdateVoter = UpdateVoter;
//Delete a voter
const DeleteVoter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield voterModel_1.default.findByIdAndDelete(req.prarams._id);
    res.sendStatus(200);
});
exports.DeleteVoter = DeleteVoter;
