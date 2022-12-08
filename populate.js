#! /usr/bin/env node

console.log('This script populates some categoreis, items to your database');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Category = require('./models/category')
var Post = require('./models/post')
var User = require('./models/user')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var categories = []
var posts = []


function createUser(username,password,profile,cb){
    var user = new User({username,password,profile})
    user.save(function(err){
        if(err){
            cb(err,null)
            return;
        }
        console.log('New User: ' +user)
        users.push(user)
        cb(null,user)
    })
}


function categoryCreate(name, cb) {
  var category = new Category({ name });
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}

function postCreate(title, text, user, categories, cb) {
  postDetail = { 
    title,
    text,
    user,
    categories,
  } 
  var post  = new Post(postDetail);    
  post.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Post: ' + post);
    posts.push(post)
    cb(null, post)
  }  );
}

function createUsers(cb){
    async.series([
        function(callback){
            createUser('Satoshi','123456','Web Developer and Data Analyst.',callback)
        }
    ],
    cb
)}


function createCategories(cb) {
    async.series([
        function(callback) {
          categoryCreate("Cooking", callback);
        },
        function(callback) {
          categoryCreate("Music", callback);
        },
        function(callback) {
          categoryCreate("Work" , callback);
        },
        ],
        // optional callback
        cb);
}


function createPosts(cb) {
    async.parallel([
        function(callback) {
          postCreate('Test1', 'This is a test post1. ',users[0], [categories[0],categories[1]] , callback);
        },
        function(callback) {
            postCreate('Test2', 'This is a test post2. ',users[0], [categories[1],categories[2]] , callback);
          },
         
        ],
        // optional callback
        cb);
}


async.series([
    createUsers,
    createCategories,
    createPosts,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Items: '+posts);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});