"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const UserSchema = new mongoose_2.Schema({
    // major: { type: Schema.Types.ObjectId, ref: 'Major' },
    courses: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'Course' }],
    startingYear: Number,
});
exports.default = mongoose_1.default.model('User', UserSchema);
