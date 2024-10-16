import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import http from "http"
import cors from "cors"

// importing routes
import auth_router from "./routes/auth_routes.js";
import user_router from "./routes/user_routes.js";
import event_router from "./routes/event_routes.js"
import business_router from "./routes/business_routes.js";
import resouce_router from "./routes/resource_routes.js";
import job_router from "./routes/job_routes.js"


dotenv.config();
const PORT = process.env.PORT || 8001;
const MONGODB_URL = process.env.MONGODB_URL ;
const app = express();
const server = http.createServer(app);


// middlewares
app.use(cors({origin : "http://localhost:5173" , credentials : true} ));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

// routes
app.use('/api/auth' , auth_router);
app.use('/api/user' , user_router);
app.use('/api/event',event_router);
app.use('/api/business' , business_router);
app.use('/api/resource' , resouce_router);
app.use('/api/job' ,job_router );



// server & mongodb
server.listen(PORT , () => {
    console.log(`server is running on the PORT ${PORT}`)
});

mongoose.connect(MONGODB_URL,{
    // connectTimeoutMS: 30000
})
.then(() => console.log("MongoDB is connected"))
.catch((error) => console.log("MongoDB connection failed"))





