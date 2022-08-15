const express = require('express');
const router = express.Router();

const { getFoods, newFood, getSingleFood, updateFood, deleteFood } = require('../controllers/foodController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/foods').get(getFoods);
router.route('/food/:id').get(getSingleFood);
router.route('/admin/food/new').post(isAuthenticatedUser, authorizeRoles('admin'), newFood);
router.route('/admin/food/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateFood).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteFood);

module.exports = router;