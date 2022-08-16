const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/JwtToken');
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto');
const user = require('../models/user');
const { send } = require('process');

//Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors( async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        role,
        avatar: {
            public_id: 'avatars/78-785827_user-profile-avatar-login-account-male-user-icon_tl4l4p',
            url: 'https://res.cloudinary.com/diellgashi/image/upload/v1660544093/avatars/78-785827_user-profile-avatar-login-account-male-user-icon_tl4l4p.png'
        }
    })

    sendToken(user, 200, res);
})

//Login user method => /api/v1/login
exports.loginUser = catchAsyncErrors( async(req, res, next) => {
    const { email, password } = req.body;
    
    //Checks if email and password are entered 
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password!', 400))
    }

    //Finding user in database
    const user = await User.findOne({ email }).select('+password')
    if(!user){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    //Checks if password is correct
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res);
})

//Forgot password method => /api/vi/password/forgot
exports.forgotPassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email});
    if(!user){
        return next(new ErrorHandler('User with this email has not been found', 404));
    }

    //Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    //Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is: \n\n${resetUrl}\n\n
    If you have not requested this, then ignore it.`

    try{
        await sendEmail({
            email: user.email,
            subject: 'Food-Delivery Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    }catch (error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))
    }
})

//Reset password method => /api/vi/password/reset/:token
exports.resetPassword = catchAsyncErrors(async(req, res, next) => {
    //Hash URL token
    const resetPasswordToken = crypto.createHash('sha256')
    .update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken, 
        resetPasswordExpire: { $gt: Date.now() }
    })

    if(!user){
        return next(new ErrorHandler('Invalid/Expired Password Reset Token', 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match', 400))
    }

    //Setup new password
    user.password =  req.body.password;
    
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

})

//Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

//Update / Change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res)

})

//Logout user method => /api/v1/logout
exports.logout = catchAsyncErrors( async(req, res, next) =>{
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})