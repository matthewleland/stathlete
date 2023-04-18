const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Token = require('../models/tokenModel')
const bcryptSalt = process.env.BCRYPT_SALT;
const crypto = require('crypto');
const sendEmail = require("../Utils/Emails/sendEmail");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // (OLD) Hash password - see userModel.js for hashing
    /* 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    */

    // Create user
    const user = await User.create({
        name,
        email,
        password //: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Authenticate new user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

// TODO
// @desc    Request to reset user password
const requestPasswordReset = asyncHandler(async (email, res) => {

    const user = await User.findOne({ email })

    if (!user) {
        res.status(400)
        throw new Error('User does not exist')
    }

    let token = await Token.findOne({ userId: user._id })

    if (token) {
        await token.deleteOne()
    }

    let resetToken = crypto.randomBytes(32).toString("hex")
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt))

    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save()

    const link = `localhost:${process.env.PORT}/recover?token=${resetToken}&id=${user._id}`
    sendEmail(user.email, "Password Reset Request", { name: user.name, link: link, }, "../Utils/Emails/templates/requestResetPassword.handlebars");
    return link;
})

// TODO
// @desc    Reset user password
const resetPassword = asyncHandler(async (userId, token, password, res) => {
    let passwordResetToken = await Token.findOne({ userId });
    if (!passwordResetToken) {
        res.status(400)
        throw new Error("Invalid or expired password reset token");
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
        res.status(400)
        throw new Error("Invalid or expired password reset token");
    }
    const hash = await bcrypt.hash(password, Number(bcryptSalt));
    await User.updateOne(
        { _id: userId },
        { $set: { password: hash } },
        { new: true }
    );
    const user = await User.findById({ _id: userId });
    sendEmail(
        user.email,
        "Password Reset Successfully",
        {
            name: user.name,
        },
        "../Utils/Emails/templates/resetPassword.handlebars"
    );
    await passwordResetToken.deleteOne();
    return true;
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
    requestPasswordReset,
    resetPassword,
}