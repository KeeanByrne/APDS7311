const mongoose = require('mongoose')

const problemschema = mongoose.Schema(
    {
        department: {type: String, required: true},
        issue: {type: String, required: true}
    }
)

module.exports = mongoose.model('Problem', problemschema)