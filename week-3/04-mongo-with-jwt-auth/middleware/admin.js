const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];

    try {
        const decodedValue = jwt.verify(jwtToken, jwtSecret);
        if (decodedValue.username) {
            next();
        }
        else {
            res.status(403).json({
                msg: "Authentication failed"
            });
        }
    }
    catch (e) {
        res.status(411).json({
            msg: "Something up with the inputs"
        })
    }


}

module.exports = adminMiddleware;