const express = require('express');
const app = express();
const urlprefix = '/api';
const mongoose = require('mongoose');
const Message = require('./models/message');
const Problem = require('./models/problem');
const fs = require('fs');
const { url } = require('inspector');
const cert = fs.readFileSync('keys/certificate.pem');
const options = {
  server: { sslCA: cert },
};
const connstring = 'mongodb+srv://Admin:r8N6rYlhRkJbILC0@cluster0.zadnzfp.mongodb.net/';

const messageRoutes = require('./routes/message');
const userRoutes = require('./routes/user');
const problemRoutes = require('./routes/problem');

// Import the necessary packages for express-brute
const ExpressBrute = require('express-brute');
const MemoryStore = ExpressBrute.MemoryStore;
const helmet = require('helmet'); // Import Helmet

mongoose.connect(connstring)
  .then(() => {
    console.log('Connected Successfully :-)');
  })
  .catch(() => {
    console.log('Not Connected Successfully :-(');
  }, options);

  app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://localhost:4200');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});

//Creating a MemoryStore for express-brute protection
const store = new MemoryStore();

const bruteforce = new ExpressBrute(store, {
  freeRetries: 5,       
  minWait: 5 * 60 * 1000, 
  maxWait: 60 * 60 * 1000, 
});

// Left in for testing purposes
app.get(urlprefix + '/', (req, res) => {
  res.send('Hello World');
});

// Protected routes with express-brute { '/users ' is brute-force protected}
app.use(urlprefix + '/messages', messageRoutes);
app.use(urlprefix + '/users',bruteforce.prevent, userRoutes);
app.use(urlprefix + '/problems', problemRoutes);

module.exports = app;
