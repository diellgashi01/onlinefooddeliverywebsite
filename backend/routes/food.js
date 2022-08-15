const express = require('express');
const router = express.Router();

const { getFoods, newFood, getSingleFood, updateFood, deleteFood } = require('../controllers/foodController');
const { isAuthenticatedUser } = require('../middlewares/auth');

router.route('/foods').get(getFoods);
router.route('/food/:id').get(getSingleFood);
router.route('/admin/food/new').post(isAuthenticatedUser, newFood);
router.route('/admin/food/:id').put(isAuthenticatedUser, updateFood).delete(isAuthenticatedUser, deleteFood);

module.exports = router;