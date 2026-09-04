const {Schema,model} = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  age:{
    type:Number,
    required:true, // if mandatory
  },

  email:{
    type:String,
    trim:true,
  },

  mobile:{
    type:String,
  },


  

  address:{
    type:String,
    required:true
  },

  aadharCardNumber:{
    type:Number,
    required:true, // if mandatory
    unique:true
  },

  password:{
    type:String,
    required:true,
  },

  role:{
    type:String,
    enum:['voter','admin'],
    default:'voter',
  },

  isVoted:{
    type:Boolean,
    default:false,
  },

  
});

const User = model("user", userSchema)

module.exports = User;