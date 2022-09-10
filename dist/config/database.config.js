"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const localDbURI = "mongodb://localhost:27017/snazzymovies?readPreference=primary&ssl=false";
const dbURI = 'mongodb+srv://nuhu:test1234@cluster0.nqabtfr.mongodb.net/nuh-prac?retryWrites=true&w=majority';
const connectDb = async () => {
    try {
        await mongoose_1.default.connect(localDbURI);
        console.log('Connected to database');
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = connectDb;
