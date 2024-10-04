const express = require('express')
const router = express.Router();
const aboutController = require('../controllers/aboutController')

//About routes:
router.get("/", aboutController.getAboutData);

module.exports = router;