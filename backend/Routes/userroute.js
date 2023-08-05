const express  = require('express');
const {registerUser,loginUser,logoutUser,getUserDetails,getNotification,postNotification,getCar,registerCars,getMember,addmember} = require('../cotrollers/usercontroller');
const {isAuthenticatedUser} = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

router.route('/me').get(getUserDetails);
router.route('/notification').get(getNotification);
router.route('/post-notification').post(postNotification);

router.route('/register-car').post(registerCars)
router.route('/cars').get(getCar)

router.route('/add-members').post(addmember)
router.route('/members').get(getMember)



module.exports = router;