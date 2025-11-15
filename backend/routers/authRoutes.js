const router = require("express").Router();
const { body } = require("express-validator");
const { registerUser, loginUser, logout } = require("../controllers/authController");
const { authenticate } = require("../middlewares/authMiddleware");

router.get('/me', authenticate, async(req, res)=>{

    const loggedUser = {
        name: req.user.name,
        email: req.user.email,
        _id: req.user._id
    }
    return res.status(200).json({user: loggedUser})
})

router.post("/register", [
    body('name').isLength({min: 3}).withMessage('Name must be atleast 3 characters long'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long.')
], registerUser)

router.post("/login", [
    body('email').isEmail().withMessage('invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long')
], loginUser)

router.post('/logout', logout)

module.exports = router