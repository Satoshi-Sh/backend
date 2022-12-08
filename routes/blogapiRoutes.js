const express = require('express')
const router = express.Router();
const blogController = require('../controllers/blogController')

router.post('/',blogController.all_posts)

module.exports = router