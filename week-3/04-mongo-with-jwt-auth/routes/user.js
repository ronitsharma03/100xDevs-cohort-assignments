const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {Course, User} = require('../db');
const {jwtSecret} = require('../config');
const jwt = require('jsonwebtoken');

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    let userRes = await User.findOne({
        username: username,
        password: password
    });
    if(userRes){
        res.json({
            msg: "User already exists"
        });
    }
    else{
        userRes = await User.create({
            username: username,
            password: password
        });
        res.json({
            msg:"User created successfully"
        });
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username: username,
        password: password
    });
    if(user){
        const token = jwt.sign({
            username
        }, jwtSecret);
        res.json({
            token
        });
    }
    else{
        res.status(411).json({
            msg: "Incorect input"
        });
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const publishedCourses = await Course.find({});
    res.json({
        courses: publishedCourses
    })

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username;
    
        await User.updateOne({
            username: username
        },
        {
            "$push": {
                purchasedCourses : courseId
            }
        });
        res.json({
            msg: "Purchase complete"
        })
    
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;
    
    const user = await User.findOne({
        username: username
    });
    
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    })
    res.json({
        msg: courses
    })
});

module.exports = router