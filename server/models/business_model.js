import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    name : {type : String , required : true } ,
    description : {type : String , required : true } ,
    category : {type : String , required : true , index : true} ,
    website : String ,
    owner : {type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true} ,
    location : {
        country : String ,
        city : String 
    } ,
    ratings : {
        total : {type : Number , default : 0},
        average : {type : Number , default : 0}
    } ,
    tags : [String] ,
    logoImage : {type : String },
    reviews : [{
        user : {type : mongoose.Schema.Types.ObjectId , ref : "User"},
        comment : {type : String } ,
        rating : {type : Number , min : 1 , max : 5}
    }]
} , {timestamps : true}) ;

export const Business = mongoose.model("Business" , businessSchema);