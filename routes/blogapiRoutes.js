const express = require('express')
const router = express.Router();
const blogController = require('../controllers/blogController')
const categoryController = require('../controllers/categoryController')

router.get('/',blogController.all_posts)

router.get('/categories',categoryController.all_categories)


router.get('/:id',blogController.get_post)



module.exports = router