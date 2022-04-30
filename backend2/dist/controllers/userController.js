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
require('../models/CourseModel');
const UserModel_1 = __importDefault(require("../models/UserModel"));
/**
 * Implements user db-level functions
 */
function getScheduleOfUser(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDocument = yield getUser(user_id);
        if (!userDocument) {
            return null;
        }
        return userDocument.populate('courses').catch((err) => {
            console.warn('Error populating courses: ' + err);
        });
    });
}
function getUser(user_id) {
    return UserModel_1.default.findById(user_id)
        .exec()
        .catch((err) => {
        console.warn('Error finding user: ' + err);
    });
}
const UserController = {
    getScheduleOfUser,
    getUser,
};
exports.default = UserController;
