const User = require("../models/user")
const Post = require("../models/post")
const Category = require("../models/category")


// display list of all posts 

exports.all_posts = (req,res,next)=>{
    Post.find({},)
    .sort({createdAt:1})
    .populate('user')
    .populate('categories')
    .exec(function(err,all_posts){
        if(err){
            return next(err)
        }
        all_posts.map(post =>{
            post.title = post.title.replace('&#x27;',"'")
            post.text = post.text.replace('&#x27;',"'")
            return post
        })
        res.json(all_posts)
    })
    
}