 import mongoose from "mongoose";

const EmpDetail = new mongoose.Schema({

    fullName:{
        type:String,
        require :true
    },

    email:{
        type: String,
        require:true
    },

    EmpID:{
        type:String,
        require:true
    },

    designation:{
        type:String,
        require:true
    },

    manager:{
        type:String,
        require:true
    },

    date:{
     type: String,
     require:true
    },

    image:{
        type:String,
        require:true
    },

    Tousers:{
        type: mongoose.Schema.Types.ObjectId, ref:'Registration'
    }

})

export default mongoose.model('EmployeeDetail',EmpDetail)












