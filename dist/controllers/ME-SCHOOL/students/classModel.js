"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const classSchema = new mongoose_1.Schema({
    level: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Level' },
    session: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Session' },
    students: [{ student: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
});
exports.default = mongoose_1.model('ClassRegister', classSchema);
