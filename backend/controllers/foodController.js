
exports.getFoods = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'This route will show all food products on the database.'
    })
}