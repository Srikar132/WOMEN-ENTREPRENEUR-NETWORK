import  mongoose  from 'mongoose';

const eventSchema = new mongoose.Schema({
    title : {type : String , required : true , index : true}  ,
    description : {type : String , required : true} ,
    date : {type : Date , required : true} ,
    location : {type : String } ,
    virtualLink : {type : String } ,
    attendees : [{type : mongoose.Schema.Types.ObjectId , ref : "User"}] ,
    createdBy : {type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true} ,
    reminders : {type : Boolean , default : true} ,
    
},{timestamps : true}) ;



export const Event = mongoose.model("Event" ,eventSchema ) ;