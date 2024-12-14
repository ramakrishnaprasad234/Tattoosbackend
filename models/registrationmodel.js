

const mongoose = require('mongoose');


const registrationSchema = new mongoose.Schema({
  username: {
    type : String,
    required : true,
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  email: {
    type : String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  phonenumber: {
    type : String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number must be 10 digits long'] 
  },
  password: {
    type : String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  confirmPassword: {
    type : String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function(value) {
        return value === this.password; // `this` refers to the current document
      },
      message: 'Passwords do not match'
    }
  }
});

// Pre-save middleware to remove confirmPassword before saving to database
registrationSchema.pre('save', function(next) {
  this.confirmPassword = undefined; // Remove confirmPassword field
  next();
});

//Reset password





module.exports = mongoose.model('User', registrationSchema);

