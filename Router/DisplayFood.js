const express = require('express')
const router = express.Router();


router.get('/foodData', async (req, res) => {
    try {
      
        res.status(200).send(global.food_items);
        console.log(global.food_items)
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
module.exports = router;