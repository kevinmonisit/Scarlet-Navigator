"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-underscore-dangle */
const mongoose_1 = __importDefault(require("mongoose"));
const async_1 = __importDefault(require("async"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const CourseModel_1 = __importDefault(require("../models/CourseModel"));
const coursesArray = [];
dotenv_1.default.config();
function createUser(courses, startingYear, plan, callback) {
    const userDocument = new UserModel_1.default({
        courses,
        startingYear,
        plan,
    });
    userDocument.save((err) => {
        if (err)
            console.warn(err);
        console.log('User created');
        callback(null);
    });
}
function createCourse(title, credits, prerequisites, callback) {
    console.log(`Creating course ${title}`);
    const courseDocument = new CourseModel_1.default({
        title,
        credits,
        prerequisites,
    });
    courseDocument.save((err) => {
        if (err)
            console.warn(err);
        coursesArray.push(courseDocument._id);
        callback(null, courseDocument);
    });
}
function getRandomInt(_min, _max) {
    const min = Math.ceil(_min);
    const max = Math.floor(_max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createCourses(callbackOuter) {
    console.log('Creating courses');
    const bogusCourses = [];
    for (let i = 0; i < 300; i += 1) {
        bogusCourses.push((callback) => {
            createCourse((0, uuid_1.v4)().slice(0, 5), getRandomInt(1, 4), [], callback);
        });
    }
    async_1.default.parallel([
        (callback) => {
            createCourse('CS112', 2, [], callback);
        },
        (callback) => {
            createCourse('CS111', 3, [], callback);
        },
        (callback) => {
            createCourse('MAT205', 2, [], callback);
        },
        (callback) => {
            createCourse('MAT201', 1, [], callback);
        },
        (callback) => {
            createCourse('CS205', 4, [], callback);
        },
        (callback) => {
            createCourse('EXPOS', 3, [], callback);
        },
        (callback) => {
            createCourse('PHL101', 4, [], callback);
        },
        (callback) => {
            createCourse('PHY103', 3, [], callback);
        },
        (callback) => {
            createCourse('CS206', 2, [], callback);
        },
        (callback) => {
            createCourse('CS211', 2, [], callback);
        },
        (callback) => {
            createCourse('CS312', 2, [], callback);
        },
    ].concat(bogusCourses), (err, result) => {
        callbackOuter(err, result);
    });
}
function createUsers(courses, callback) {
    console.log('Creating users');
    const startingYear = 2022;
    const plan = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ];
    createUser([], startingYear, plan, callback);
}
mongoose_1.default
    .connect('mongodb://localhost:27017/s-n-t')
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
