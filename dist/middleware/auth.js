"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const userModel_1 = require("../model/userModel");
async function auth(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        const cookie = req.cookies.token;
        if (!authorization && !cookie) {
            return res.send(`<div style="text-align: center">
         <h1 style="color: red;">Not Logged In</h1>
         <a style="background-color:yellowgreen; color:#fff; border-radius:1rem; padding:1rem 3rem; text-decoration:none" href="http://localhost:3000/login">Back to Login Page</a>
        </div>`);
            //   res.status(401).json({
            //       Error: 'Kindly sign in as a user'
            //   })
            // res.redirect('/')
        }
        const token = authorization?.slice(7, authorization.length) || cookie;
        let verified = jsonwebtoken_1.default.verify(token, secret);
        if (!verified) {
            return res.status(401).json({
                Error: 'User not verified, you cant access this route'
            });
        }
        const { id } = verified;
        const user = await userModel_1.UserInstance.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                Error: 'User not verified'
            });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        return res.send(`<div style="text-align: center">
        <h1 style="color: red;">Not Logged In</h1>
        <a style="background-color:yellowgreen; color:#fff; border-radius:1rem; padding:1rem 3rem; text-decoration:none" href="http://localhost:3000/login">Back to Login Page</a>
        </div>`);
        // res.redirect('/login')
        // res.status(403).json({
        //     Error:'User not logged in'
        // })
    }
}
exports.auth = auth;
