const express = require('express');
const router = express.Router();

const { getFoods, newFood, getSingleFood } = require('../controllers/foodController');

router.route('/foods').get(getFoods);
router.route('/food/new').post(newFood);
router.route('/food/:id').get(getSingleFood);

module.exports = router;