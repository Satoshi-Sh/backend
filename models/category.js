const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const CategorySchema = new Schema({
    name:{type:String,required:true,min_length:1,maxLength:50},
},{toJSON:{virtuals:true}})



// Export model 
module.exports = mongoose.model("Category",CategorySchema)

