const express = require('express');
const router = express.Router();
const Problem = require('../models/problem');
const checkauth = require('../check-auth'); 

router.post('/problems', checkauth, (req, res)=>{
    const problem = new Problem (
        {
            department: req.body.department,
            issue: req.body.issue
        }
    )
    problem.save()
    res.status(201).json({
        message: 'Problem Posted :-)',
        problem:problem
    })

})

module.exports = router;
