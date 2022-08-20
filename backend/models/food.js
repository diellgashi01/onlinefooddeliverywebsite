const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter food name'],
        trim: true,
        maxLength: [100, 'Food name cannot exceed 100 characters!']
    },
    price: {
        type: Number,
        required: [true, 'Please enter food price'],
        maxLength: [5, 'Food price cannot exceed 5 digits!'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter food description']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, "Please select a food category!"],
        enum: {
            values: [
                'Burgers',
                'Pizzas',
                'Sandwiches',
                'Pasta',
                'Salads',
                'Soups',
                'Vegetarian',
                'Sides',
                'Snacks',
                'Sauces',
                'Drinks'
            ],
            message: 'Please select one of the correct categories!'
        }
    },
    stock: {
        type: Number,
        required: [true, 'please enter food stock!'],
        maxLength: [5, 'Food product stock cannot exceed 5 digits!'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        }
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Food', foodSchema);