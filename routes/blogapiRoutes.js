const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const blogController = require('../controllers/blogController')
const categoryController = require('../controllers/categoryController')

router.get('/',blogController.all_posts)

router.get('/categories',categoryController.all_categories)
router.post('/write',verifyToken,blogController.new_post)
router.post('/delete/:id', verifyToken, blogController.deletePost)
router.post('/update/:id',verifyToken, blogController.updatePost)



router.get('/:id',blogController.get_post)

// verify token 

function verifyToken(req,res,next){
    const auth=req.body['token']
    if(typeof auth !=='undefined'){
        jwt.verify(auth,process.env.JWT,(err,authData)=>{
           if (err){
            return res.status(500).send({auth:false, message:err})
           }
           res.locals.user = authData
           next() 
        }) 
    } else {
        res.sendStatus(401).send({
        auth:false,
        message:"Token required"
        })
    }
}

module.exports = router