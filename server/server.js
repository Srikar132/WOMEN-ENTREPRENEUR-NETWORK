import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import http from "http"
import cors from "cors"

// importing routes
import auth_router from "./routes/auth_routes.js"
import user_router from "./routes/user_routes.js"

dotenv.config();
const PORT = process.env.PORT || 8001;
const MONGODB_URL = process.env.MONGODB_URL ;
const app = express();
const server = http.createServer(app);

// middlewares
app.use(cors({origin : "*"}));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

// routes
app.use('/api/auth' , auth_router);
app.use('/api/user' , user_router)

// server & mongodb
server.listen(PORT , () => {
    console.log(`server is running on the PORT ${PORT}`)
});

mongoose.connect(MONGODB_URL)
.then(() => console.log("MongoDB is connected"))
.catch((error) => console.log("MongoDB connection failed"))





