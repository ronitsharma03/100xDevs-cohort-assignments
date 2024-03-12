const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const jwt = require('jsonwebtoken');
const {Admin} = require('../db')
const router = Router();
const {jwtSecret} = require('../config');
const {Course} = require('../db')

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

        await Admin.create({
            username: username,
            password: password
        });
        res.json({
            msg: "Admin created successfully!"
        });
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.findOne({
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

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

        let courseRes = await Course.findOne({
            title: title,
            description: description,
            imageLink: imageLink,
            price: price
        });
        if(courseRes){
            res.json({
                msg: "Course already exists"
            });
        }
        else{
            courseRes = await Course.create({
                title: title,
                description: description,
                imageLink: imageLink,
                price: price
            });
            res.json({
                msg: "Course created successfully",
                courseId: courseRes._id
            });
        }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});
    res.json({
        courses: allCourses
    });
});

module.exports = router;