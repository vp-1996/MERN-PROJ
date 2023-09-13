import mongoose from "mongoose";
import Registration from './userModel'

// const Schema = mongoose.Schema;
const assetDetail = new mongoose.Schema({
    fullName:{
        type : String,
        require :true
    },

    serial:{
        type:String,
        require: true
    },
    model:{
         type : String,
         require: true
    },
    image:{
        type:String,
        require: true
    } , 

    // user:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref : Registration
    // }
    
});

export default mongoose.model('assetDetail',assetDetail) 

// const schema = new mongoose.Schema({ name: String, size: String });
// const Tank = mongoose.model('Tank', schema);

