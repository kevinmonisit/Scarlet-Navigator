"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const userAPI_1 = __importDefault(require("./api/userAPI"));
dotenv_1.default.config();
mongoose_1.default
    .connect('mongodb://localhost:27017/scarlet-navigator-test')
    .catch((err) => {
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
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.set('json spaces', 2);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/v1/user', userAPI_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
