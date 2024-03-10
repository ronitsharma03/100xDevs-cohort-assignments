const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

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

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    // here user can send anything so make sure in real world to do input validation with Zod library?
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