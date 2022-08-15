const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Checks if user is authenticated
exports.isAuthenticatedUser = catchAsyncErrors( async(req, res, next) =>{
    const { token } = req.cookies
    if(!token){
        return next(new ErrorHandler('The user must be logged in to access this command', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
})