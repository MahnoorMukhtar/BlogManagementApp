const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


module.exports.authenticate = async(req, res, next) => {
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1]
    console.log("token", token)

    if(!token){
        return res.status(401).json({message: "Unauthorized."})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.user_id)
        if(!user){
            return res.status(401).json({message: 'User not found'})
        }
        req.user = user
        next()
        
    } catch (error) {
        return res.status(401).json({message: "Unauthorized to access this page"})
    }
}
