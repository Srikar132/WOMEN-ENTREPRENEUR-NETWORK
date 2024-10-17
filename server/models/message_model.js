import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender : {type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true} ,
    recipient : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required : function () { return !this.isCommunity}} ,
    message : {type : String , required : true} ,
    isCommunity : {type : String , default : false},
    timestamp : {type : Date  , default : Date.now} 
});

export const Message = mongoose.model("Message" , messageSchema) ;