"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const userAPI_1 = __importDefault(require("./api/userAPI"));
const courses_1 = __importDefault(require("./api/courses"));
dotenv_1.default.config();
// const mongoUri = !process.env['DEVELOPMENT_MODE']
//   ? process.env['MONGO_URI']
//   : process.env['MONGO_TEST_URI'];
const mongoUri = process.env['MONGO_TEST_URI'];
console.info(`DEVELOPMENT MODE is ${process.env['DEVELOPMENT_MODE']}`);
console.info(`Using mongo URI: ${mongoUri}`);
mongoose_1.default.connect(mongoUri !== null && mongoUri !== void 0 ? mongoUri : '').catch((err) => {
    console.warn(err);
});
mongoose_1.default.connection
    .once('open', () => {
    console.log('Connected to MongoDB');
})
    .on('error', (error) => {
    console.warn(error);
});
const app = (0, express_1.default)();
const port = process.env['PORT'];
app.use((0, morgan_1.default)('tiny'));
app.set('json spaces', 2);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use('/api/v1/user', userAPI_1.default);
app.use('/api/v1/courses', courses_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
