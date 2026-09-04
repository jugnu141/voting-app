const express = require('express');
const router = express.Router();
const candidate = require("../models/candidate")


// 2 handlers required -> for Login, for Signup

const { addCandidate , updateCandidate, deleteCandidate, startVoting, voteCount, getCandidates} = require('../controllers/candidate');




const {auth} = require("../middlewares/voting");

// HW -> make sure there is only one admin -> write code

router.post('/addCandidate', auth, addCandidate); //add new candidate, only admin can do this
router.put('/:candidateID', auth, updateCandidate);
router.delete('/:candidateID', auth, deleteCandidate);
router.post('/vote/:candidateID', auth, startVoting);
router.get('/vote/voteCount', voteCount);

// HW -> print list of candidates
router.get('/', getCandidates);






module.exports = router;