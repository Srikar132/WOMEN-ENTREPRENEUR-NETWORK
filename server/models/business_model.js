import mongoose from "mongoose";

const getISTTime = () => {
    const currentDate = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
    const istTime = new Date(currentDate.getTime() + istOffset);
    return istTime;
  };

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
} ,{
    timestamps: { currentTime: getISTTime } 
  }
) ;
businessSchema.index({ name: "text", description: "text", category: "text",tags: "text" });


export const Business = mongoose.model("Business" , businessSchema);