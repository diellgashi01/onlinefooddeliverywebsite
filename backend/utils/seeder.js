const Food = require('../models/food');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const foods = require('../data/foods');

//Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

const seedProducts = async () => {
    try {

        await Food.deleteMany();
        console.log('All food products are deleted!');

        await Food.insertMany(foods);
        console.log('All Food Products have been added!');

        process.exit();
        
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();