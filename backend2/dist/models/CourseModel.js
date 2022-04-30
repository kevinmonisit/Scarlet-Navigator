"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const CourseSchema = new mongoose_2.Schema({
    title: String,
    credits: { type: Number, min: 0, max: 4 },
    prerequisites: [{ type: mongoose_2.Schema.Types.ObjectId, ref: 'Course' }],
});
exports.default = mongoose_1.default.model('Course', CourseSchema);
