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
const CourseModel_1 = __importDefault(require("../models/CourseModel"));
/**
 * Implements user db-level functions
 */
function getCoursesOfUser(user_id) {
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
function getPlanOfUser(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDocument = yield getUser(user_id);
        if (userDocument == null) {
            return null;
        }
        const plan = userDocument['plan'];
        const planWithCourseDocs = [];
        for (let semester = 0; semester < plan.length; semester++) {
            const classesOfSemester = plan[semester];
            planWithCourseDocs.push([]);
            for (let course = 0; classesOfSemester && course < classesOfSemester.length; course++) {
                const courseId = classesOfSemester[course];
                const courseDocument = yield CourseModel_1.default.findById(courseId)
                    .exec()
                    .catch((err) => {
                    console.warn('Error: ' + err);
                    return null;
                    //https://stackoverflow.com/questions/26076511/handling-multiple-catches-in-promise-chain
                    //when i want to do error handling
                });
                planWithCourseDocs[semester].push(courseDocument);
            }
        }
        return planWithCourseDocs;
    });
}
function updatePlanOfUser(user_id, newPlan) {
    return __awaiter(this, void 0, void 0, function* () { });
}
function getUser(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return UserModel_1.default.findById(user_id)
            .exec()
            .catch((err) => {
            console.warn('Error finding user: ' + err);
        });
    });
}
const UserController = {
    getCoursesOfUser,
    updatePlanOfUser,
    getPlanOfUser,
    getUser,
};
exports.default = UserController;
