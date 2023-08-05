const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,


    },
    password:{
        type: String,
        required: [true, "Please Enter Your Password"],
        select: false,


    },
    
    name:{
        type:String
    },
    designation:{
        type:String
    },
    
    personalinfo:{
        phoneno:{
            type:String

        },
        sex:{
            type:String,
        },
        age:{
            type:String,
        },
        bloodgrp:{
            type:String
        },
        address:{
            type:String,
        },
        city:{
            type:String
        },
        pincode:{
            type:String
        }
        


    }

});

UserSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);