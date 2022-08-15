const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/JwtToken');

//Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors( async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
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