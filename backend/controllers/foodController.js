const Food = require('../models/food')

//Create new Food Product => /api/v1/food/new
exports.newFood = async (req, res, next) => {
    const food = await Food.create(req.body);
    res.status(201).json({
        success: true,
        food
    })
} 

//Get all Food Products => /api/admin/v1/foods
exports.getFoods = async(req, res, next) => {
    const foods = await Food.find();

    res.status(200).json({
        success: true,
        count: foods.length,
        foods
    })
}

//Get a single Food Product by ID => /api/v1/food/:id
exports.getSingleFood = async(req, res, next) =>{
    const food = await Food.findById(req.params.id);
    
    if(!food){
        return res.status(404).json({
            success: false,
            message: 'Food product not found.'
        })
    }

    res.status(200).json({
        success: true,
        food
    })
}

//Update Food Product => /api/v1/admin/product/:id
exports.updateFood = async(req, res, next) => {
    let food = await Food.findById(req.params.id);
    
    if(!food){
        return res.status(404).json({
            success: false,
            message: 'Food product not found.'
        })
    }

    food = await Food.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        food
    })
}

//Delete Product => /api/v1/admin/product/:id
exports.deleteFood = async(req, res, next) => {
    const food  = await Food.findById(req.params.id);

    if(!food){
        return res.status(404).json({
            success: false,
            message: 'Food product not found.'
        })
    }

    await food.remove();
    res.status(200).json({
        success: true,
        message: 'Food product is deleted.'
    })
}