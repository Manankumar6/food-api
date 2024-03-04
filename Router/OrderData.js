const express = require('express');
const router = express.Router();
const OrderSchema = require('../models/Orders');

router.post('/orderdata', async (req, res) => {
    console.log(req.body)
    try {
        // Validation
        if (!req.body.order_data || !req.body.email) {
            return res.status(400).json({ success: false, message: 'Invalid request data.' });
        }

        let data =  req.body.order_data ;
        await data.splice(0,0,{Order_date:req.body.order_date})
        let emailId = await OrderSchema.findOne({ 'email': req.body.email });

        if (emailId === null) {
            await OrderSchema.create({
                email: req.body.email,
                order_data: [ data],
                order_date:req.body.order_date
            });
        } else {
            await OrderSchema.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data ,
                            order_date:req.body.order_date

                } },
                { upsert: true }
            );
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.post('/myorderdata', async (req, res) =>{
   try {
    
       const orderData = await OrderSchema.findOne({"email":req.body.email})

       res.status(200).json({foodData: orderData})
    } catch (error) {
     res.status(400).json({message:"internal server error "})
    }
})

module.exports = router;
