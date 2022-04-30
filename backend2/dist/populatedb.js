"use strict";
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
    console.warn(err);
})
    .then(() => {
    mongoose_1.default.connection.db.dropDatabase();
    console.log('Connected to MongoDB database and database dropped.');
    async_1.default.waterfall([
        (callback) => {
            createCourses(callback);
        },
        (courses, callback) => {
            createUsers(courses, callback);
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
function createUser(courses, startingYear, callback) {
    const userDocument = new UserModel_1.default({ courses, startingYear });
    userDocument.save((err) => {
        if (err)
            console.warn(err);
        console.log('User created');
        callback(null);
    });
}
function createCourse(title, credits, prerequisites, callback) {
    console.log(`Creating course ${title}`);
    const courseDocument = new CourseModel_1.default({ title, credits, prerequisites });
    courseDocument.save((err) => {
        if (err)
            console.warn(err);
        callback(null, courseDocument);
    });
}
function createCourses(callback) {
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
}
function createUsers(courses, callback) {
    console.log('Creating users');
    createUser(courses.map((course) => {
        return course._id;
    }), 2, callback);
}
