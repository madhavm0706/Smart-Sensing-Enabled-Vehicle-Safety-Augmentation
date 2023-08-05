const User = require('../Models/User');
const Cars = require('../Models/Cars');
const Members = require('../Models/Member');
const Notification = require('../Models/Notification');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const sendToken = require('../Utils/SendTken');
const ErrorHandler = require('../Utils/Errorhandler');



// Register User
exports.registerUser = asyncErrorHandler(async (req, res, next) => {

    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    // });

    const {email, password,name,designation,personalinfo } = req.body;

    const user = await User.create({ email, password,name,designation,personalinfo});

    sendToken(user, 201, res);
});

// Login User
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(new ErrorHandler("Please Enter Email And Password", 400));
    }

    const user = await User.findOne({ email:"madhavm0706@gmail.com"}).select("+password");
    console.log(user)
    if(!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    res.status(200).json({
        success: true,
        user,

    });
});

// Logout User
exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Get User Details
exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {
    
    
    const user = await User.findById("6378d2b100b4e91bac3d1ed4");

    res.status(200).json({
        success: true,
        user,
    });
});

exports.getNotification = asyncErrorHandler(async (req,res,next)=>{
    const notification = await Notification.find({userid:"6378d2b100b4e91bac3d1ed4"});

    res.status(200).json({
        success: true,
        notification,
    });

})
exports.postNotification = asyncErrorHandler(async (req,res,next)=>{

    const {message,type} = req.body;
    const userid = "6378d2b100b4e91bac3d1ed4";
    data = "26.355812 80.325"
    const notification = await Notification.create({userid,message,data,type});

    res.status(200).json({
        success:true,
        message:"New Notification",
        notification
    })


})

exports.getCar = asyncErrorHandler(async (req,res,next)=>{
    const cars = await Cars.find({userid:"6378d2b100b4e91bac3d1ed4"});

    res.status(200).json({
        success: true,
        cars,
    });

})
exports.registerCars = asyncErrorHandler(async (req,res,next)=>{

    const {carno,
    carname,
    carowner} = req.body;
    const userid = "6378d2b100b4e91bac3d1ed4";
    const cars = await Cars.create({userid,carno,
        carname,
        carowner});

    res.status(200).json({
        success:true,
        message:"New Notification",
        cars
    })


})

exports.getMember = asyncErrorHandler(async (req,res,next)=>{
    const members = await Members.find({userid:"6378d2b100b4e91bac3d1ed4"});

    res.status(200).json({
        success: true,
        members,
    });

})
exports.addmember = asyncErrorHandler(async (req,res,next)=>{

    const {memberdetails} = req.body;
    const userid = "6378d2b100b4e91bac3d1ed4";

    const members = await Members.find({userid:"6378d2b100b4e91bac3d1ed4"});
    console.log(members);

    if(members.length == 0){
        
        const members = await Members.create({userid,memberdetails}).then(data => {
            res.status(200).json({
                success:true,
                message:"Member Added",
                
            })
            
          }).catch(err => {
            console.log(err);
          });
    
        


    }else{
        await Members.findOneAndUpdate({
            "_id":userid
          },
          
          {
            $push:{
              "memberdetails":[memberdetails]
        
        
              
        
            }
          }
          ).then(data => {
            res.status(200).json({ message: "Data added successfully" });
          }).catch(err => {
            console.log(err);
          })
        
            res.status(200).json({
                success:true,
                message:"New Member added",
                members
            })

    }

   
 


})

