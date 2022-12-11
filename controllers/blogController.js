const User = require("../models/user")
const Post = require("../models/post")
const Category = require("../models/category")


// display list of all posts 

exports.all_posts = (req,res,next)=>{
    Post.find({},)
    .sort({createdAt:-1})
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

// get a post by id 

exports.get_post = (req,res,next)=>{
    Post.findById(req.params.id)
    .populate('user')
    .populate('categories')
    .exec((err,post)=>{
        if(err|!post){
            res.json(err)
        }
        else {
            
            res.json(post)
        }
    })
    
}

// create a new post 

exports.new_post= (req,res,next) =>{
    post = new Post ({
        title:req.body.title,
        user:res.locals.user,
        text:req.body.text,
        imageURL:req.body.imageURL,
        categories:req.body.categories
    }).save((err)=>{
        if(err){
            return next(err)
        }
        res.json({
            message:"Post created...",
            user:req.user,
            post
        })
    })
}

