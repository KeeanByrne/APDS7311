const express = require('express');
const router = express.Router();
const Problem = require('../models/problem');
const checkauth = require('../check-auth'); 


router.get('/getproblems',checkauth, (req, res) => {
    Problem.find().then((problems)=>{
        res.json(
            {
                message: 'Problems Found',
                problems:problems 
            }
        )
    })
})



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

router.delete('/:id', checkauth, (req, res)=>{
    Problem.deleteOne({_id: req.params.id})
    .then((result)=>
    {
        res.status(200).json({message: "Problem Has Been Solved :-) "});
    });
})

module.exports = router;
