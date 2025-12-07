const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String}, 
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, // to establish relation with User model
}, {timestamps: true});


module.exports = mongoose.model('Note', noteSchema);