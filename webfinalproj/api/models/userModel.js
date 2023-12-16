const mongoose =  require('mongoose');
var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      about:{
        type: String
      },
      skills:{
        type: String
      },
      profileImage:{
        type: String
      },
      coverImage:{
        type: String
      },
      gigsInfo:{
        type: String
      },
  });
const User = mongoose.model('User', userSchema);

module.exports=User;