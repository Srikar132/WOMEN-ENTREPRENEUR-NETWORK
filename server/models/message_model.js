import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender : {type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true} ,
    recipient : {type : mongoose.Schema.Types.ObjectId , ref : 'User' , required : true} ,
    messageContent : {type : String} ,
    timestamp : {type : Date  , default : Date.now} 
});

export const Message = mongoose.model("Message" , messageSchema) ;