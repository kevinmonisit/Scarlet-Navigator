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
const express_1 = __importDefault(require("express"));
const courseController_1 = __importDefault(require("../controllers/courseController"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, search, searchType } = req.query;
    if (Number.isNaN(amount) || amount <= 0 || amount > 100) {
        res.status(400).send({
            error: 'amount parameter should be a number, x, where 0 <= x <= 100',
        });
        return;
    }
    if (searchType > 2 || searchType < 0) {
        res.status(400).send({
            error: `SearchType is invalid. Value is ${searchType}`,
        });
        return;
    }
    const coursesQuery = yield courseController_1.default.getCourses(search, amount, searchType);
    res.status(200).send({ coursesQuery });
}));
exports.default = router;
