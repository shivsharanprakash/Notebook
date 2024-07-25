const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');
const JWT_SECRET = 'prakashisunstoppable';

// Route 1:create user using:using post "/api/auth/createusers"no login required
router.post('/createuser', [
    body('name', 'enter a valid name ').isLength({ min: 2 }),
    body('password', 'password must be at least 5 charecter').isLength({ min: 5 }),
    body('email', 'enter a valid email').isEmail(),
],

    async (req, res) => {
        let success=false;
        //If there are errors ,return bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({success, errors: errors.array() });
        }

        try {
            //Check weather the users with this email exist already 
            let user = await User.findOne({ email: req.body.email });

            if (user) {
                return res.status(400).json({success, error: "sorry a user with this email already exist " });
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            //create a new user
            user = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            /// console.log(jwtData);
            //res.json(user);
            success=true;
            res.json({success, authtoken });
        }

        catch (error) {
            console.error(error.message);
            res.status(500).send("some Error occured");
        }

    })


//Route 2:authenticate a user using :POST "api/auth/login" no login replied
router.post('/login',
   
    [
        body('password', 'password cannot be blank').exists(),
        body('email', 'enter a valid email').isEmail(),
    ],


    async (req, res) => {
        let success=false;
        //If there are errors ,return bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials " });
            }

            const passswordCompare = bcrypt.compare(password, user.password);
            if (!passswordCompare) {
                success=false;
                return res.status(400).json({ success, error: "Please try to login with correct credentials " });
            }

            const data = {
                user: {
                    id: user.id
                }
            };
            
            const authtoken = jwt.sign(data, JWT_SECRET);
            success=true;
            /// console.log(jwtData);
            //res.json(user);
            success=true;
            res.json({ success,authtoken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error  occuered ");
        }

    });



//Route 3:Get User Details using:POST "/api/auth/getuser".Login must be required.

router.post('/getuser',fetchuser, async (req, res) => {

        try {
            userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error  occuered ");
        }
    })


module.exports = router;