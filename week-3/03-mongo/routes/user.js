const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db");
const userMiddleware = require("../middleware/user");

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

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const publishedCourses = await Course.find({});
    res.json({
        courses: publishedCourses
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    User.updateOne({
        username: username
    },
    {
        "$push": {
            purchasedCourses : courseId
        }
    }).catch(function(e){
        console.log(e)
    });
    res.json({
        msg: "Purchase complete"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });
    console.log(user.purchasedCourses)
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