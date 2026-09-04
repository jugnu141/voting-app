const bcrypt = require('bcrypt');
const User = require('../models/user');
const candidate = require('../models/candidate');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const {auth} = require("../middlewares/voting");


// function to check if logged in by Admin or not
const checkAdminRole = async (userId) =>{
    try{
        const user = await User.findById(userId);
        return user.role === 'admin';
    }

    catch(err){
        return false;
    }
}

// route handler to add a candidate
exports.addCandidate = async (req,res) =>{
    try{

        if(!(await checkAdminRole(req.user.id))){
            return res.status(403).json({
                success:false,
                message:'user does not have Admin role',
            })
        }


        const data = req.body; // assuming the request body contains the candidate data

        const newCandidate = new candidate(data);

        // save the new candidate in the database
        const response = await newCandidate.save();
        console.log('data saved');
        res.status(200).json({
            response:response,
        })
        
        
    }

    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"candidate cannot be registered,please try again later"
        })
    }
}



// route handler to update a candidate
exports.updateCandidate = async (req,res) =>{
    try{

        if(!(await checkAdminRole(req.user.id))){
            return res.status(403).json({
                success:false,
                message:'user does not have Admin role',
            })
        }

        // extract the Id from URL parameter
        const candidateID = req.params.candidateID;
        const updateCandidateData = req.body;

        const response = await candidate.findByIdAndUpdate(candidateID, updateCandidateData,{
            new:true, // return the updated document
            runValidators:true // run mongoose validation
        })

        if(!response){
            return res.status(404).json({
                error:'candidate not found'
            });
        }


        console.log('candidate data updated');
        res.status(200).json(response);
    }

    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}




// route handler to delete a candidate

exports.deleteCandidate = async (req,res) =>{
    try{

        if(!(await checkAdminRole(req.user.id))){
            return res.status(403).json({
                success:false,
                message:'user does not have Admin role',
            })
        }

        // extract the Id from URL parameter
        const candidateID = req.params.candidateID;
      

        const response = await candidate.findByIdAndDelete(candidateID);

        if(!response){
            return res.status(404).json({
                error:'candidate not found'
            });
        }


        console.log('candidate deleted');
        res.status(200).json({
            success:true,
            message:"Candidate Deleted",
            response
        });
    }

    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}




// lets start voting
exports.startVoting = async (req, res) =>{
    // no admin can vote
        // user can vote only once 

        candidateID = req.params.candidateID;
        userId = req.user.id;

    try{
        // find the candidate document with the specified candidateID
        const currCandidate = await candidate.findById(candidateID);

        if(!currCandidate){
            return res.status(404).json({
                message:"Candidate not found",
            })
        }

        const user = await User.findById(userId);
        if(!user){
             return res.status(404).json({
                message:"user not found",
            })
        }

        if(user.isVoted){
            return res.status(400).json({
                message:"you already voted"
            })
        }

        if(user.role === 'admin'){
            return res.status(400).json({
                message:"Admin is not allowed"
            })
        }


        // update the candidate document to record the vote
        currCandidate.votes.push({user: userId});
        currCandidate.voteCount++;
        await currCandidate.save();

        // update the user document
        user.isVoted = true;
        await user.save();

        res.status(200).json({
            message:"Vote recorded successfully "
        })


    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error:'Internal Server Error'
        })
    }
} 


// handler for vote count
exports.voteCount = async (req,res) =>{
    try{
        // find all the candidates and sort them by voteCount in descending order
        const currCandidate = await candidate.find().sort({voteCount: 'desc'});

        // map the candidates to only return their name and vote count
        const voteRecord = currCandidate.map((data) =>{
            return {
                name : data.name,
                party: data.party,
                count : data.voteCount
            }
        });

        return res.status(200).json(voteRecord);


    }

    catch(err){
        console.error(err);
        res.status(500).json({
            error:'Internal Server Error'
    })
    }


}


exports.getCandidates = async (req, res) => {
    try {
        const candidates = await candidate.find();

        return res.status(200).json({
            success: true,
            candidates: candidates
        });
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch candidates"
        });
    }
};