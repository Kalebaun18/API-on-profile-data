
const mongoose = require('mongoose');
const freelancerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  skill: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  rating : {
    type : String,
    required : true 
  },
  charge : {
    type : String,
    required : true 
  },

});

module.exports = mongoose.model('freelancer', freelancerSchema);
