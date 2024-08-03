const userModel=require('../models/user-model');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const { generateToken }= require('../utils/generateToken')
module.exports.registerUser= async function (req, res) {
    try{
    let {fullname,email,password}=req.body;
    let user=await userModel.findOne({email});
    if (user) {
        req.flash("error", "You already have an account, please login.");
        return res.redirect("/");
      }
    bcrypt.genSalt(10,(err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if(err) return res.send(err.message);
            else {
                let user=await userModel.create({
                    fullname,
                    email,
                    password:hash,
                 });
               let token= generateToken(user);
                res.cookie("token",token);
                res.render("/")
            };
        });
    })
    } 
    catch(err){
       res.status(400).send(err.message);
    }
}

module.exports.loginUser= async function (req, res) {
    let {email,password}=req.body;
    let user= await userModel.findOne({email:email});
    if(!user){
        req.flash("error", "Incorrect Email")
        return res.redirect("/")
    } 
    else{
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
               let token= generateToken(user);
               res.cookie("token",token);
               res.render("shop");
            }
            else{
             req.flash("error", "Incorrect Password")
             return res.redirect("/")
            } 
        })
    }
}

module.exports.logoutUser = function (req, res) {
    res.cookie("token", "");
    res.redirect("/");
  };