const jwt = require("jsonwebtoken");
require("dotenv").config();




// first middleware
exports.auth = (req,res, next) =>{
    try{
        // extract JWT token
        // PENDING: other ways to fetch token
        // By - Cookie, Body, Header(Most secure way)


        


        //console.log("Cookie", req.cookies?.token);


        //console.log("Body", req.body?.token);
            // getting error when body doesnt have token

        console.log("header", req.header("Authorization")?.replace("bearer ",""));


         const token =
            req.cookies?.token || 
            req.body?.token || 
            req.header("Authorization")?.replace("Bearer ","");
       
       

        if(!token || token===undefined){
            return res.status(401).json({
                success:false,
                message:"Token Missing"
            })
        }

        // verify the token
        try{
            const payload = jwt.verify(token,  process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload; // why this ??
            // with the id in payload, user ka koi bhi data nikaal skte hai, like:name,email 
        }
        catch(error){
            console.log(error);

            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }

        next(); // go to next middleware

    }

    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong, while verifying the token"
        })
    }
}