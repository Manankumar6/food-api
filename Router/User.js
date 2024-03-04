const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../models/UserSchema')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const jWT_SECURE = process.env.JWT_SECRET;



// Create User 
router.post('/createuser', [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
    body('location').isLength({ min: 5 })

], async (req, res) => {
    const { name, email, password, location } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const bcyptPass = await bcrypt.hash(password, salt)

    try {
        const createUser = await User.create({
            name: name,
            email: email,
            password: bcyptPass,
            location: location
        })

        console.log(createUser)
        return res.status(200).json({ message: "Create Successfully" })

    } catch (error) {
        res.status(400).json({ message: error })
    }
})

router.post('/login', [
    body('email').isEmail(),

    body('password').isLength({ min: 5 })


], async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ message: "Invaild Credentials" })
        }

        const comparePass = await bcrypt.compare(password, userData.password)
        if (!comparePass) {
            return res.status(400).json({ message: "Invaild Credentials" })

        }
        const data = {
            user:{
                id:userData._id
            }
        }
        const authToken = jwt.sign(data,jWT_SECURE)
        return res.status(200).json({ message: "Login Successfully",authToken })
    } catch (error) {
        res.status(400).json({ message: "Invaild Credentials" })
    }
})


module.exports = router