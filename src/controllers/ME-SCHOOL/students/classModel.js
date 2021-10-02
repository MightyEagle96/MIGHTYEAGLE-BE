"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var classSchema = new mongoose_1.Schema({
    level: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Level' },
    session: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Session' },
    students: [{ student: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
});
exports.default = mongoose_1.model('ClassRegister', classSchema);
