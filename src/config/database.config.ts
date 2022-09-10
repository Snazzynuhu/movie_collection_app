import mongoose from "mongoose"

const localDbURI = "mongodb://localhost:27017/snazzymovies?readPreference=primary&ssl=false"
const dbURI = 'mongodb+srv://nuhu:test1234@cluster0.nqabtfr.mongodb.net/nuh-prac?retryWrites=true&w=majority'
const connectDb = async () => {
    try {
        await mongoose.connect(localDbURI)
        console.log('Connected to database')
    } catch (error) {
        console.log(error);
    }
} 
export default connectDb;

