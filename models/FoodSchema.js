const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    options: [
        {
            half: {
                type: String,
                required: true
            },
            full: {
                type: String,
                required: true
            }
        }
        // Add more options if needed
    ],
    description: {
        type: String,
        required: true
    }
});

const FoodItem = mongoose.model('Item', foodItemSchema);

module.exports = FoodItem;
