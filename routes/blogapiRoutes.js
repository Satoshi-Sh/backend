const express = require('express')
const router = express.Router();
const blogController = require('../controllers/blogController')

router.get('/',blogController.all_posts)
router.get('/:id',blogController.get_post)

module.exports = router