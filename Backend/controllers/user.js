const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const {auth} = require("../middlewares/voting");





// sign up route handler
exports.signup = async (req,res) =>{
    try{
        //get data of the user
        const {name,age,email,mobile,address,aadharCardNumber,password,role} = req.body;

        // check if user already exist
        const existingUser = await User.findOne({aadharCardNumber});
        
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User Already Exist"
            })
        }


        //  for single admin

        // check if trying to create an admin
        if (role === "admin") {
            const existingAdmin = await User.findOne({
                role: "admin"
            });

            if (existingAdmin) {
                return res.status(403).json({
                    success: false,
                    message: "Only one admin is allowed"
                });
            }
        }





        // secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }

        catch{
            return res.status(500).json({
                success:false,
                message:'Error in hashing password'
            })
        }

        // Default role is voter
        const userRole = role === "admin" ? "admin" : "voter";

        // create entry for user -> save all the entry
        const newUser = await User.create({
            name,
            age,
            email,
            address,
            mobile,
            aadharCardNumber,
            password: hashedPassword,
            role: userRole
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: newUser
        });
    }

    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"user cannot be registered,please try again later"
        })
    }
}






// Log in Ke liye Code
exports.login = async (req,res)=>{
    try{
        // sabse pahle data fetch karenge
        const {aadharCardNumber,password} = req.body;

        // validation on email and password
        if(!aadharCardNumber || !password){
            return res.status(400).json({
                success:false,
                message:'Please Fill the details carefully'
            })
        }

        // check for registered user
        

        let user = await User.findOne({aadharCardNumber});

        

        // if not a registered user
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not registered"
            })
        }

        const payload = {
            
            id: user._id,
            
            // dont send Aadhar Number, as it can be used by hackers
        }

        // verify password and generate JWT token
        if(await bcrypt.compare(password, user.password)){
            //password match
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:'2h',
            });


            user = user.toObject();
                // user converted into object
                // what is the reason ????
            user.token = token;             
            user.password = undefined;

            const aadhar =String(user.aadharCardNumber);

            user.aadharCardNumber =
            "XXXX XXXX " + aadhar.slice(-4);//taaki hacker se bacha rhe,
            // object se hataya hai, database me se nahi


            // ek cookie create karte hai

            // cookie(name,data,options)
            const options = {
                expires:new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,

            }

            

            // token passed
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"User Logged In Successfully"
            })


            // token not passed

            //  res.status(200).json({
            //     success:true,
            //     token,
            //     user,
            //     message:"User Logged In Successfully"
            // })


        }
        else{
            // password match nahi hua
            return res.status(403).json({
                success:false,
                message:"Password Incorrect"
            })
        }
    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Log In Failure"
        })
    }
}


// profile handler
exports.profile = async (req, res) =>{
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId);
        res.status(200).json({
            user
        })
    }

    catch(error){
        console.error(error);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
}


// change profile password
exports.changeProfilePassword = async (req,res) =>{
    try{
        const userId = req.user.id; // extract the id from token

        const {currentPassword, newPassword} = req.body;

        // Validate input
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide current and new password"
            });
        }

        // find the user by userId
        const user = await User.findById(userId);

        if(!await bcrypt.compare(currentPassword, user.password))
        {
            // password not matched
            return res.status(401).json({
                error:'Invalid username and password'
            })
        }

        // password matched

        // update the password

       
        //hash the password
        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        console.log('password updated');
        res.status(200).json({
            success:true,
            message:"password updated"
        })

    }

    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            error:"Internal server Error"
        })
    }
}


