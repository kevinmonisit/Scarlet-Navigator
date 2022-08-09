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
const CourseModel_1 = __importDefault(require("../models/CourseModel"));
/**
 * Implements course dv-level functions
 */
// eslint-disable-next-line no-shadow
var SEARCH_BY;
(function (SEARCH_BY) {
    SEARCH_BY[SEARCH_BY["TITLE"] = 0] = "TITLE";
    SEARCH_BY[SEARCH_BY["NUMBER"] = 1] = "NUMBER";
    SEARCH_BY[SEARCH_BY["EXPANDED_TITLE"] = 2] = "EXPANDED_TITLE";
})(SEARCH_BY || (SEARCH_BY = {}));
/**
 *
 * TODO: ADD ERROR HANDLING
 * The entire app crashes when you search a slash '/'
 */
function getCourses(name, numberToQuery, searchType = SEARCH_BY.TITLE) {
    return __awaiter(this, void 0, void 0, function* () {
        const regexSearch = new RegExp(`${name}`);
        const byTitle = {
            title: { $regex: regexSearch, $options: 'i' },
        };
        const byCourseNumbers = {
            courseString: { $regex: regexSearch, $options: 'i' },
        };
        const byExpandedTitle = {
            queryTitle: { $regex: regexSearch, $options: 'i' },
        };
        let query = byTitle;
        const searchTypeAsNumber = parseInt(searchType, 10);
        if (searchTypeAsNumber === SEARCH_BY.NUMBER) {
            query = byCourseNumbers;
        }
        else if (searchTypeAsNumber === SEARCH_BY.EXPANDED_TITLE) {
            query = byExpandedTitle;
        }
        const coursesQuery = yield CourseModel_1.default.find(query)
            .limit(numberToQuery)
            .exec();
        return coursesQuery;
    });
}
const CourseController = {
    getCourses,
};
exports.default = CourseController;
