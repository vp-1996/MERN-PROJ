import mongoose from "mongoose";

const registerUser = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true
    },

    password:{
        type: String,
        require:true,
    }

})

export default mongoose.model('Registration',registerUser)


///// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDllNGQyYzA5YTdmMzE5ZTNiNjM5MmEiLCJpYXQiOjE2OTA3ODUyODIsImV4cCI6MTY5MDc4ODg4Mn0.X89jFRKUAhYpVsnmDMtxRRcvAwyPRzptpukqw4-Xqs0
      
////  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDllNGQyYzA5YTdmMzE5ZTNiNjM5MmEiLCJpYXQiOjE2OTA4MTUzMzEsImV4cCI6MTY5MDk4ODEzMX0.NG9IPGvcT0D9VvvzwKOj2F0xV59YkVOJ2MDuBrkissI
