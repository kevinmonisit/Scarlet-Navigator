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
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('accessing users');
});
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = yield userController_1.default.getUser(req.params['id']);
    if (userQuery) {
        res.status(200).send({ userQuery });
    }
    else {
        res.status(404).send('Invalid user query');
    }
}));
router.get('/:id/schedule/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const coursesQuery = yield userController_1.default.getScheduleOfUser(req.params['id']);
    if (coursesQuery) {
        res.status(200).send({ courses: coursesQuery['courses'] });
    }
    else {
        res.status(404).send('Invalid user id');
    }
}));
router.patch('/:id/schedule', (req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
module.exports = router;
