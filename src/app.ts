import createError from 'http-errors';
import express,{Request,Response,NextFunction} from 'express'
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
// import connectDb from './config/database.config';


import userRouter from './routes/userRoute';
import movieRouter from './routes/movieRoute';
import homeRouter from './routes/homeRoute';

// connectDb()

const app = express();

const dbURI = 'mongodb+srv://nuhu:test1234@cluster0.nqabtfr.mongodb.net/nuh-prac?retryWrites=true&w=majority'
const localDbURI = "mongodb://localhost:27017/snazzymovies?readPreference=primary&ssl=false"

mongoose.connect(localDbURI)
.then(()=>console.log('Connected to mongo database'))
.catch((err)=>console.log('Connection failed'+ err));
// view engine setup
app.set('views', path.join(__dirname, "..",'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('public')));

// MIDDLEWARES
app.use('', homeRouter);
app.use('/users', userRouter);
app.use('/movies', movieRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:createError.HttpError, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
