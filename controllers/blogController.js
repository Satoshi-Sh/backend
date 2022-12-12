const User = require("../models/user")
const Post = require("../models/post")
const Category = require("../models/category")
const { query } = require("express")


// display list of all posts 

exports.all_posts = (req,res,next)=>{
    let query;
    let name;
    if (req.query.category&& req.query.name){
       query = {categories:req.query.category}
       name= {name:req.query.name}
    }
    else {
        query={}
    }
    Post.find(query,)
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
        res.json([all_posts,name])
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

// delete post 

exports.deletePost = (req,res,next) =>{
    Post.findByIdAndRemove(req.params.id,(err,post)=>{
        if (err||!post){
            next(err)
        }
        res.json({'message':`${post.title} deleted`})
    })
}

// update post 

exports.updatePost = (req,res,next) =>{
    Post.findByIdAndUpdate(req.params.id,
        {
            title:req.body.title,
            user:res.locals.user,
            text:req.body.text,
            imageURL:req.body.imageURL,
            categories:req.body.categories 
        },(err,post)=>{
            if(err||!post){
                return next(err)
            }
            res.send({'message':`${post.title} updated`})
        })
}
