const mongoose = require('mongoose')

const messageschema = mongoose.Schema(
    {
        id: {type: String, required:true}, 
        name: {type: String, required:true}
    }
) 

module.exports = mongoose.model('Message', messageschema)