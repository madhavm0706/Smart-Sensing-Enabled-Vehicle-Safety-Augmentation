const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const ErrorHandler = require('../Utils/Errorhandler');
const asyncErrorHandler = require('./asyncErrorHandler');


exports.isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {

    const { token } = req.cookies;
    console.log(token);

    if (!token) {
        return next(new ErrorHandler("Please Login to Access", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});