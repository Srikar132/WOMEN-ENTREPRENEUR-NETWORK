import  mongoose  from 'mongoose';

const eventSchema = new mongoose.Schema({
    title : {type : String , required : true , index : true}  ,
    description : {type : String , required : true} ,
    date : {type : Date , required : true} ,
    location : {countru : String , state : String  } ,
    virtualLink : {type : String } ,
    category : {type : String} ,
    attendees : [{type : mongoose.Schema.Types.ObjectId , ref : "User"}] ,
    createdBy : {type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true} ,
    reminders : {type : Boolean , default : true} ,
    tags : [String]
},{timestamps : true}) ;



export const Event = mongoose.model("Event" ,eventSchema ) ;