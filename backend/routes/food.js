const express = require('express');
const router = express.Router();

const { getFoods, newFood, getSingleFood, updateFood } = require('../controllers/foodController');

router.route('/foods').get(getFoods);
router.route('/food/:id').get(getSingleFood);
router.route('/admin/food/new').post(newFood);
router.route('/admin/food/:id').put(updateFood);

module.exports = router;