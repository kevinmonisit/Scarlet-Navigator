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
const UserModel_1 = __importDefault(require("../models/UserModel"));
const CourseModel_1 = __importDefault(require("../models/CourseModel"));
require('../models/CourseModel');
/**
 * Implements user db-level functions
 */
function getUser(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        return UserModel_1.default.findById(userID)
            .exec()
            .catch((err) => {
            console.warn(`Error finding user: ${err}`);
        });
    });
}
function getCoursesOfUser(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDocument = yield getUser(userID);
        if (!userDocument) {
            return null;
        }
        return userDocument.populate('courses').catch((err) => {
            console.warn(`Error populating courses: ${err}`);
        });
    });
}
function getPlanOfUser(userID, planIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDocument = yield getUser(userID);
        if (userDocument == null) {
            return null;
        }
        let { plan } = userDocument;
        const planIndexAsNumber = parseInt(planIndex, 10);
        if (planIndexAsNumber === 2) {
            plan = userDocument.secondPlan;
        }
        else if (planIndexAsNumber === 3) {
            plan = userDocument.thirdPlan;
        }
        console.log(plan);
        const planWithCourseDocs = [];
        for (let semester = 0; semester < plan.length; semester += 1) {
            const classesOfSemester = plan[semester];
            planWithCourseDocs.push([]);
            for (let course = 0; classesOfSemester && course < classesOfSemester.length; course += 1) {
                const courseId = classesOfSemester[course];
                // possible way to make it more optimized
                // eslint-disable-next-line no-await-in-loop
                const courseDocument = yield CourseModel_1.default.findById(courseId)
                    .exec()
                    .catch((err) => {
                    console.warn(`Error: ${err}`);
                    return null;
                    // https://stackoverflow.com/questions/26076511/handling-multiple-catches-in-promise-chain
                    // when i want to do error handling
                });
                planWithCourseDocs[semester].push(courseDocument);
            }
        }
        return planWithCourseDocs;
    });
}
function updatePlanOfUser(userID, newPlan, planIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDocument = yield getUser(userID);
        if (userDocument == null) {
            return null;
        }
        if (planIndex === 1) {
            userDocument.plan = newPlan;
        }
        else if (planIndex === 2) {
            userDocument.secondPlan = newPlan;
        }
        else if (planIndex === 3) {
            userDocument.thirdPlan = newPlan;
        }
        return userDocument.save();
    });
}
const UserController = {
    getCoursesOfUser,
    updatePlanOfUser,
    getPlanOfUser,
    getUser,
};
exports.default = UserController;
