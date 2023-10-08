const express = require('express')
const app = express()
const urlprefix = '/api'
const mongoose = require('mongoose')
const Message = require('./models/message')
const fs = require('fs');
const { url } = require('inspector')
const cert = fs.readFileSync('keys/certificate.pem');

const options = {
    server: {sslCA: cert}};
const connstring = 'mongodb+srv://Admin:r8N6rYlhRkJbILC0@cluster0.zadnzfp.mongodb.net/'

mongoose.connect(connstring)
.then(()=>
{
    console.log('Connected Successfully :-)')
})
.catch(()=>
{
    console.log('Not Connected Successfully :-(')
},options);

app.use(express.json())


app.get(urlprefix+'/', (req, res) => {
    res.send('Hello World')
})


app.get(urlprefix+'/messages', (req, res) => {
    Message.find().then((messages)=>{
        res.json(
            {
                message: 'Messages Found',
                messages:messages 
            }
        )
    })
})


app.post(urlprefix+'/messages', (req, res) => {
    const message = new Message (
        {
            id: req.body.id, 
            name: req.body.name
        }
    )
    message.save();
    res.status(201).json({
        message: 'Message created', 
        message:message
    })
})

app.delete(urlprefix+"/messages/:id", (req, res)=>{
    Message.deleteOne({_id: req.params.id})
    .then((result)=>
    {
        res.status(200).json({message: "Message Has Been Deleted"});
    });
})


module.exports = app;