const Food = require('../models/food');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')

//Create new Food Product => /api/v1/food/new
exports.newFood = catchAsyncErrors (async (req, res, next) => {
    const food = await Food.create(req.body);
    res.status(201).json({
        success: true,
        food
    })
})

//Get all Food Products => /api/admin/v1/foods?keyword="pepperoni"
exports.getFoods = catchAsyncErrors (async(req, res, next) => {
    const resPerPage = 12;
    const foodCount = await Food.countDocuments();
    const apiFeatures = new APIFeatures(Food.find(), req.query).search().filter().pagination(resPerPage)
    const foods = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: foods.length,
        foodCount,
        foods
    })
})

//Get a single Food Product by ID => /api/v1/food/:id
exports.getSingleFood = catchAsyncErrors (async(req, res, next) =>{
    const food = await Food.findById(req.params.id);
    
    if(!food){
        return next(new ErrorHandler('Food product not found', 404));
    }

    res.status(200).json({
        success: true,
        food
    })
})

//Update Food Product => /api/v1/admin/product/:id
exports.updateFood = catchAsyncErrors (async(req, res, next) => {
    let food = await Food.findById(req.params.id);
    
    if(!food){
        return next(new ErrorHandler('Food product not found', 404));
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
})

//Delete Product => /api/v1/admin/product/:id
exports.deleteFood = catchAsyncErrors (async(req, res, next) => {
    const food  = await Food.findById(req.params.id);

    if(!food){
        return next(new ErrorHandler('Food product not found', 404));
    }

    await food.remove();
    res.status(200).json({
        success: true,
        message: 'Food product is deleted.'
    })
})