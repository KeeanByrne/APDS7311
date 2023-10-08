const express = require('express')
const router = express.Router();
const Message = require('../models/message')
const checkauth = require('../check-auth')


router.get('', (req, res) => {
    Message.find().then((messages)=>{
        res.json(
            {
                message: 'Messages Found',
                messages:messages 
            }
        )
    })
})


router.post('', checkauth, (req, res) => {
    const message = new Message (
        {
            id: req.body.id, 
            name: req.body.name
        }
    )
    message.save().then(()=>{
        res.status(201).json({
        message: 'Message created',
        message:message
        })
    })
})
       

router.delete('/:id', checkauth, (req, res)=>{
    Message.deleteOne({_id: req.params.id})
    .then((result)=>
    {
        res.status(200).json({message: "Message Has Been Deleted"});
    });
})

module.exports = router