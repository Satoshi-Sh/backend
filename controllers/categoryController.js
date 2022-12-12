const Category = require("../models/category")


// get all categories 

exports.all_categories = (req,res, next) =>{
    Category.find({},)
    .sort({createdAt:1})
    .exec(function(err,all_categories){
        if(err){
            return next(err)
        }
        res.json(all_categories)
    })
}

