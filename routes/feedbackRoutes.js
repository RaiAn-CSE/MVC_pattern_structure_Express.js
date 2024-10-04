const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Routes for feedback
router.get("/", feedbackController.getAllFeedback);
router.post("/", feedbackController.postFeedback);
router.delete("/:id", feedbackController.deleteFeedback);
router.patch("/:id", feedbackController.updateFeedback);
router.get("/search/:key", feedbackController.searchFeedback);

module.exports = router;