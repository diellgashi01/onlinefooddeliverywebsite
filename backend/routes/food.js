const express = require('express');
const router = express.Router();

const { getFoods } = require('../controllers/foodController');

router.route('/foods').get(getFoods);

module.exports = router;