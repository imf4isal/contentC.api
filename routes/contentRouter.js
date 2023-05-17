const express = require('express');
const contentController = require('../controllers/contentControllers');

const router = express.Router();

router.route('/').get(contentController.getAllContents);
router
    .route('/:id')
    .get(contentController.getContent)
    .patch(contentController.updateContent)
    .delete(contentController.deleteContent);

module.exports = router;
