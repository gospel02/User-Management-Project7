const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstName: {
      type: String
  },
  lastName: {
      type: String
  },
  email:{
      type: String
  },
  age: {
      type: String
  }  
});

mongoose.model('User', userSchema);