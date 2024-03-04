
const mongoose = require("mongoose")
const mongoURI = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI)

        const fetch_data = await mongoose.connection.db.collection('Items');
        
        const data = await fetch_data.find({}).toArray();
        global.food_items = data;
        console.log("Connection successfully")

    }

    catch (error) {
        console.error("Connection failed")

    }
}

module.exports = connectDB;