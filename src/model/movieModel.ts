// import { DataTypes, Model } from "sequelize";
// import db from '../config/database.config'

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
import mongoose from "mongoose";
const Schema = mongoose.Schema;


const movieSchema = new Schema({
  id:{
      type: String,
      required: true
  }, 
  title:{
      type: String,
      required: true
  }, 
  description:{
      type: String,
      required: true
  }, 
  imageUrl:{
      type: String,
      required: true
  }, 
  price:{
      type: Number,
      required: true
  }, 
  userId:{
      type: String,
      required: true
  }
},{
  timestamps: true
});


export const MovieInstance = mongoose.model('Movie', movieSchema);

// module.exports = MovieInstance;