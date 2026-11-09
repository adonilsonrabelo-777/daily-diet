
const express = require('express');
const sessionsController = require('../controllers/sessionsController');

const router = express.Router();

router.post('/', sessionsController.create);

module.exports = router;
