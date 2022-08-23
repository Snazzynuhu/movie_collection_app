"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registration = exports.getUsers = exports.LogoutUser = exports.LoginUser = exports.RegisterUser = void 0;
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const userModel_1 = require("../model/userModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const movieModel_1 = require("../model/movieModel");
async function RegisterUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.registerSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const duplicatEmail = await userModel_1.UserInstance.findOne({ where: { email: req.body.email } });
        if (duplicatEmail) {
            return res.status(409).json({
                msg: "Email is used, please change email"
            });
        }
        //   const username = await UserInstance.findOne({where:{username:req.body.username}})
        //   if(username){
        //    return res.status(409).json({
        //       msg:"username number is used"
        //    })
        //   }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await userModel_1.UserInstance.create({
            id: id,
            fullname: req.body.fullname,
            username: req.body.username,
            email: req.body.email,
            password: passwordHash
        });
        //  res.status(201).json({
        //      msg:"You have successfully created a user",
        //      record
        //  })
        //CHANGE THIS LINE 
        // res.send("Hurray!!! registered");
        res.redirect("/login");
        // res.render('register');
        //THIS LINE
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'failed to register',
            route: '/register'
        });
    }
}
exports.RegisterUser = RegisterUser;
async function LoginUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.loginSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message
            });
        }
        const User = await userModel_1.UserInstance.findOne({ where: { email: req.body.email } });
        const { id } = User;
        const token = (0, utils_1.generateToken)({ id });
        const validUser = await bcryptjs_1.default.compare(req.body.password, User.password);
        if (!validUser) {
            res.send(`<div style="text-align: center">
   <h1 style="color: red;">Password incorrect</h1>
   <a style="background-color:yellowgreen; color:#fff; border-radius:1rem; padding:1rem 3rem; text-decoration:none" href="http://localhost:3000/login">Back to Login</a>
   </div>`);
            //    res.status(401).json({
            //       message:"Password do not match"
            //   })
        }
        if (validUser) {
            res.cookie("token", token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: "strict",
                httpOnly: true,
            });
            res.cookie("id", id, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: "strict",
                httpOnly: true,
            });
            res.redirect("/dashboard");
        }
    }
    catch (err) {
        res.send(`<div style="text-align: center">
   <h1 style="color: red;">Not Registered</h1>
   <a style="background-color:yellowgreen; color:#fff; border-radius:1rem; padding:1rem 3rem; text-decoration:none" href="http://localhost:3000/register">Click to register</a>
   </div>`);
        // res.status(500).json({
        //  msg:'failed to login',
        //  route:'/login'
        // })
    }
}
exports.LoginUser = LoginUser;
async function LogoutUser(req, res, next) {
    res.cookie("token", '', {
        maxAge: 0,
        sameSite: "strict",
        httpOnly: true,
    });
    res.cookie("id", '', {
        maxAge: 0,
        sameSite: "strict",
        httpOnly: true,
    });
    res.redirect('/');
}
exports.LogoutUser = LogoutUser;
async function getUsers(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        //  const record = await MovieInstance.findAll({where: {},limit, offset})
        const record = await userModel_1.UserInstance.findAndCountAll({ limit, offset,
            include: [{
                    model: movieModel_1.MovieInstance,
                    as: 'todo'
                }
            ]
        });
        res.status(200).json({
            msg: "You have successfully fetch all users",
            count: record.count,
            record: record.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/read",
        });
    }
}
exports.getUsers = getUsers;
async function registration(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        res.render('register');
    }
    catch (err) {
        res.status(500).json({
            msg: 'failed to login',
            route: '/login'
        });
    }
}
exports.registration = registration;
async function login(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        res.render('login');
    }
    catch (err) {
        res.status(500).json({
            msg: 'failed to login',
            route: '/login'
        });
    }
}
exports.login = login;
