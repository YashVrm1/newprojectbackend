"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const csurf_1 = __importDefault(require("csurf"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const mongoose = require('./database/mongoose');
// const webSocket = require('./socket/websocket');
// const crone = require('./crone/crone');
const app = express_1.default();
process.env.SECRET_KEY = 'ADIOS AMIGOS';
app.use(express_1.default.static("src"));
app.use(express_1.default.static("src/components/public/images"));
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use(cookie_parser_1.default());
app.use(express_session_1.default({
    secret: 'My super session secret',
    cookie: {
        httpOnly: true,
        secure: true
    }
}));
app.use(csurf_1.default());
app.use((req, res, next) => {
    res.locals._csrf = req.csrfToken();
    console.log(`${req.method} ${req.url}`);
    console.log(req.body);
    next();
});
app.set('port', (process.env.PORT || 5000));
const routes = routes_1.default(app);
app.get("/index", (req, res) => {
    res.sendFile(__dirname + '/home.html');
});
app.get("/", (req, res) => {
    res.json('HELLO MYPROJECT');
});
exports.default = app;
//# sourceMappingURL=app.js.map