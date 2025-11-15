const { validationResult } = require("express-validator")
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")


const generateToken = (userId) => {
    return jwt.sign({ user_id: userId }, process.env.JWT_SECRET, { expiresIn: '2d' })
}

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log("errors", errors)

        const { name, password, email } = req.body;
        console.log("req body", req.body)

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ name, email, password });
        const token = generateToken(user._id);

        const userCreated = {
            name,
            email,
            _id: user._id
        }

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: "lax",
        });
        res.status(201).json({ succes: true, user:userCreated, token });
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log("errors", errors.array())
            return res.status(400).json({ errors: errors.array() })
        }
        const { email, password } = req.body

        console.log("user req", req.body)

        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(401).json({ message: 'invalid email or password' })
        }
        const isPasswordCorrect = await user.isValidPassword(password)
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'invalid email or password' })
        }

          const userCreated = {
            name: user.name,
            email: user.email,
            _id: user._id
        }

        const token = generateToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: "lax",
        });
        res.status(200).json({ success: true, user: userCreated, token })
    } catch (error) {
        console.error("Error in login in user:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const logout = async (req, res) => {
    try {
        const token = req?.cookies?.token || req?.headers?.authorization?.split(' ')[1]
        res.clearCookie('token')
        return res.status(200).json({success: true, message: 'Loggout out Successfully.' })
    } catch (error) {
        console.log("error in logout user", error)
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    registerUser,
    loginUser,
    logout
}