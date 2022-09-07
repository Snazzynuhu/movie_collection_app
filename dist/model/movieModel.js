"use strict";
// import { DataTypes, Model } from "sequelize";
// import db from '../config/database.config'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieInstance = void 0;
// interface MovieAttributes {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   price: number;
//   userId:string
// }
// export class MovieInstance extends Model<MovieAttributes> {}
// MovieInstance.init({
//   id: {
//     type:DataTypes.UUIDV4,
//     primaryKey:true,
//     allowNull:false
//   },
//   title:{
//      type:DataTypes.STRING,
//      allowNull:false 
//   },
//   description:{
//      type:DataTypes.STRING,
//      allowNull:false 
//   },
//   image:{
//      type:DataTypes.STRING,
//      allowNull:false 
//   },
//   price:{
//      type:DataTypes.NUMBER,
//      allowNull:false 
//   },
//   userId:{
//     type:DataTypes.STRING
//   }
// },{
//     sequelize:db,
//     tableName:'movies'
// });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const movieSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
exports.MovieInstance = mongoose_1.default.model('Movie', movieSchema);
// module.exports = MovieInstance;
