const express = require('express');
const router = express.Router();

const { 
    getFoods, 
    newFood, 
    getSingleFood, 
    updateFood, 
    deleteFood, 
    createFoodReview,
    getFoodReviews,
    deleteFoodReviews
    } = require('../controllers/foodController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/foods').get(getFoods);
router.route('/food/:id').get(getSingleFood);
router.route('/admin/food/new').post(isAuthenticatedUser, authorizeRoles('admin'), newFood);
router.route('/admin/food/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateFood).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteFood);
router.route('/review').put(isAuthenticatedUser, createFoodReview)
router.route('/reviews').get(isAuthenticatedUser, getFoodReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteFoodReviews)


module.exports = router;