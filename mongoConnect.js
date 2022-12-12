require('dotenv').config()
const mongoose = require('mongoose');


// function async connectMongoServer(){
//     mongoose.connect(process.env.MONGO,{useNewUrlParser:true,useUnifiedTopology:true})
//     const db= mongoose.connection;
//     db.on("error",console.error.bind(console,"mongo connection error"))
// }

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(proces.env.MONGO);
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch(error){
        console.log(error)
        process.exit(1)
    }
}


module.exports = connectDB