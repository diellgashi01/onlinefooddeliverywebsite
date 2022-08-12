const Food = require('../models/food')

//Create new Food Product => /api/v1/food/new
exports.newFood = async (req, res, next) => {
    const food = await Food.create(req.body);
    res.status(201).json({
        success: true,
        food
    })
} 

//Get all Food Products => /api/v1/foods
exports.getFoods = async(req, res, next) => {
    const foods = await Food.find();

    res.status(200).json({
        success: true,
        count: foods.length,
        foods
    })
}