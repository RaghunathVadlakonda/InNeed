const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_signup = (req,res,next) => {

    User.find({email:req.body.email},{mobile:req.body.mobile})
    .then(user =>{
        //user shouldn't be an empty array
        if(user.length >= 1){
            //409 is a conflict
            return res.status(409).json({
                message : 'E-mail or mobile number is already exists, please try with different email and phone!'
            });
        }
        else{
 //the number 10 here is to perform hashing 10 times to 
     //avoid our password to googling in dictionary tables
            bcrypt.hash(req.body.password,10,(err,hash) =>{
                if(err){
                    return res.status(500).json({
                        error : err
                    });
                }
                else{
                    const user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        email : req.body.email,
                        name : req.body.name,
                        address : req.body.address,
                        mobile : req.body.mobile,
                        pincode : req.body.pincode,
                        password : hash
                    });
                    user
                    .save()
                    .then(result =>{
                        console.log(result);
                        res.status(201).json({
                            message :'User created!'
                        })
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error : err
                        })
                    });
                }
            });

        }
    });
}

exports.user_login = (req,res,next) =>{
    User.find({ name:req.body.name})
    .exec()
    .then(user =>{
        if(user.length < 1){
            return res.status(401).json({
                message : 'Authentication failed!'
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result) =>{
            if(err){
                return res.status(401).json({
                    message : 'Authentication failed!'
                });
            }
            if(result){
                const token = jwt.sign({
                    name : user[0].name,
                    userId : user[0]._id
                },
                process.env.JWTKEY,
                {
                    expiresIn:"1h"
                }
               );
                return res.status(200).json({
                    message:'Authentication successful, User logged in successfully!',
                    token : token
                });
            }
            res.status(401).json({
                message : 'Authentication failed!'
            });
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
}

exports.user_delete = (req,res,next) => {
    User.remove({_id:req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message:'User deleted!   '
        }); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
}

exports.users_get = (req,res,next) => {
    User.findById(req.params.userId)
    .select('email name address mobile pincode')
    .exec()
    .then(result => {
        console.log(result); 
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
}

exports.users_get_all = (req,res,next) => {
    User.find()
    .select('email name address mobile pincode')
    .exec()
    .then(result => {
        console.log(result); 
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
}

