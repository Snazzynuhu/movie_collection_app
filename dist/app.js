"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
// import connectDb from './config/database.config';
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const movieRoute_1 = __importDefault(require("./routes/movieRoute"));
const homeRoute_1 = __importDefault(require("./routes/homeRoute"));
// connectDb()
const app = (0, express_1.default)();
const dbURI = 'mongodb+srv://nuhu:test1234@cluster0.nqabtfr.mongodb.net/nuh-prac?retryWrites=true&w=majority';
const localDbURI = "mongodb://localhost:27017/snazzymovies?readPreference=primary&ssl=false";
mongoose_1.default.connect(localDbURI)
    .then(() => console.log('Connected to mongo database'))
    .catch((err) => console.log('Connection failed' + err));
// view engine setup
app.set('views', path_1.default.join(__dirname, "..", 'views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join('public')));
// MIDDLEWARES
app.use('', homeRoute_1.default);
app.use('/users', userRoute_1.default);
app.use('/movies', movieRoute_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
