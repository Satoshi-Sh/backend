require('dotenv').config()
const mongoose = require('mongoose');


function connectMongoServer(){
    mongoose.connect(process.env.MONGO,{useNewUrlParser:true,useUnifiedTopology:true})
    const db= mongoose.connection;
    db.on("error",console.error.bind(console,"mongo connection error"))
}


module.exports = connectMongoServer