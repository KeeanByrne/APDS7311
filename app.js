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
const messageRoutes = require("./routes/message");
const userRoutes = require("./routes/user");

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
app.use((reg,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

//Left in for testing purposes
app.get(urlprefix+'/', (req, res) => {
    res.send('Hello World')
})

app.use(urlprefix+'/messages',messageRoutes)
app.use(urlprefix+'/users',userRoutes)

module.exports = app;