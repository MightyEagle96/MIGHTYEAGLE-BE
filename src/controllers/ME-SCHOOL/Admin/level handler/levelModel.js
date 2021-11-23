"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var labels_1 = require("../../../../utils/labels");
var levelSchema = new mongoose_1.Schema({
    level: {
        type: String,
        unique: [true, 'This level already exists'],
        trim: true,
    },
    category: {
        type: String,
        enum: [labels_1.JUNIOR_LABEL, labels_1.SENIOR_LABEL, labels_1.BOTH_LABEL],
        required: true,
    },
    levelTeacher: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
});
exports.default = mongoose_1.model('Level', levelSchema);
