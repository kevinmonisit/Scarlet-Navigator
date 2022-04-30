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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserModel_1 = __importDefault(require("./models/UserModel"));
const CourseModel_1 = __importDefault(require("./models/CourseModel"));
const async_1 = __importDefault(require("async"));
dotenv_1.default.config();
mongoose_1.default
    .connect('mongodb://localhost:27017/scarlet-navigator-test')
    .catch((err) => {
    console.log(err);
})
    .then(() => {
    mongoose_1.default.connection.db.dropDatabase();
    console.log('Connected to MongoDB database and database dropped.');
    async_1.default.waterfall([
        (callback) => {
            createCourses(callback);
        },
        (courses, callback) => {
            createUsers(courses);
            callback(null);
        },
    ], (err) => {
        if (err) {
            console.warn(err);
        }
        else {
            console.log('Successful population of database');
        }
        process.exit();
    });
});
mongoose_1.default.connection.on('error', (err) => {
    console.warn(`Error: ${err}`);
});
function createUser(courses, startingYear) {
    const userDocument = new UserModel_1.default({ courses, startingYear });
    userDocument.save(userDocument, (err) => {
        if (err)
            console.warn(err);
    });
}
function createCourse(course, credits, prerequisites, callback) {
    console.log(`Creating course ${course}`);
    const courseDocument = new CourseModel_1.default({ course, credits, prerequisites });
    courseDocument.save((err) => {
        if (err)
            console.warn(err);
        callback(null, courseDocument);
    });
}
function createCourses(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Creating courses');
        async_1.default.parallel([
            (callback) => {
                createCourse('test #1', 2, [], callback);
            },
            (callback) => {
                createCourse('test #2', 3, [], callback);
            },
            (callback) => {
                createCourse('test #3', 2, [], callback);
            },
            (callback) => {
                createCourse('test #4', 2, [], callback);
            },
        ], (err, result) => {
            callback(err, result);
        });
    });
}
function createUsers(courses) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Creating users');
        createUser(courses.map((course) => {
            return course._id;
        }), 2);
    });
}
