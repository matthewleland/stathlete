const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authoization.startsWith('Bearer')){
        try {
            // Get token from header
            token = req.headers.authoization.split(' ')[1]
            
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user fro the token
            req.user = await User.findbyId(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')

        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }


})

module.exports = { protect }