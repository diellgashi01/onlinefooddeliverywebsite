const express = require('express');
const router = express.Router();

const { getFoods, newFood } = require('../controllers/foodController');

router.route('/foods').get(getFoods);
router.route('/food/new').post(newFood);

module.exports = router;