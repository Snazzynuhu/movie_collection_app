"use strict";
// import { DataTypes, Model } from "sequelize";
// import db from '../config/database.config'
// import { MovieInstance } from "./movieModel";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
// interface UsersAttributes {
//   id: string;
//   fullname:string;
//   username:string;
//   email:string;
//   password:string
// }
// export class UserInstance extends Model<UsersAttributes> {}
// UserInstance.init({
//   id: {
//     type:DataTypes.UUIDV4,
//     primaryKey:true,
//     allowNull:false
//   },
//   fullname:{
//      type:DataTypes.STRING,
//      allowNull:false,
//      validate:{
//          notNull:{
//              msg:'fullname is required'
//          },
//          notEmpty:{
//              msg:'Please provide a fullname'
//          }
//      }
//   },
//   username:{
//     type:DataTypes.STRING,
//     allowNull:false,
//     validate:{
//         notNull:{
//             msg:'last name is required'
//         },
//         notEmpty:{
//             msg:'Please provide a lastname'
//         }
//     }
//   },
//   email:{
//     type:DataTypes.STRING,
//     allowNull:false,
//     unique:true,
//     validate:{
//         notNull:{
//             msg:'email is required'
//         },
//         isEmail:{
//             msg:'Please provide a  valid Email'
//         }
//     }
//   },
//   password:{
//     type:DataTypes.STRING,
//     allowNull:false,
//     validate:{
//         notNull:{
//             msg:'password is required'
//         },
//         notEmpty:{
//             msg:'Please provide a password'
//         }
//     }
//   }
// },{
//     sequelize:db,
//     tableName:'user'
// });
// UserInstance.hasMany(MovieInstance, {foreignKey:'userId',
// as:'movies'
// })
// MovieInstance.belongsTo(UserInstance,{foreignKey:'userId',
// as:'user'}) 
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    fullname: String,
    username: String,
    email: String,
    password: String,
    address: String,
    movies: [{
            type: Schema.Types.ObjectId,
            ref: "movies"
        }]
}, { timestamps: true });
exports.UserInstance = mongoose_1.default.model('User', userSchema);
