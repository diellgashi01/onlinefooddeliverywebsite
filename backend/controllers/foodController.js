const Food = require('../models/food')

//Create new Food Product => /api/v1/food/new
exports.newFood = async (req, res, next) => {
    const food = await Food.create(req.body);
    res.status(201).json({
        success: true,
        food
    })
} 

exports.getFoods = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'This route will show all food products on the database.'
    })
}