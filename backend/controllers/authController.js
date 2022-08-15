const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

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

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
    })
})