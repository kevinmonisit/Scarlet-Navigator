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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('accessing users');
});
router.get('/:id', () => { });
router.get('/schedule/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userDocument = yield UserModel_1.default.findById(req.params['id'])
        .exec()
        .catch((err) => {
        console.warn(err);
    });
    if (userDocument) {
        const courses = yield userDocument.populate('courses');
        res.status(200).send({ courses });
    }
    else {
        res.status(404).send('User does not exist');
    }
    // UserModel.findById(req.params['id'])
    // .populate('courses')
    // .exec()
    // .catch((err) => {
    //   res.status(500).send('Error: ' + err);
    // })
    // .then((courses) => {
    //   if (courses?.courses.length == 0) {
    //     res.status(404).send('Could not find id');
    //   }
    //   res.status(200).send({ courses: courses?.courses });
    // });
}));
module.exports = router;
