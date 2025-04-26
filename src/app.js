import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","DELETE","OPTIONS","PUT"],
    allowedHeaders:["Content-Type","Authorization",'Accept'],
    exposedHeaders: ["Set-Cookie", "*"],
}))

//router imports
import helthCheckRouter from "./routes/heltcheck.routes.js"

import authroute from "./routes/auth.routes.js"
import projectRouter from "./routes/project.routes.js"
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use("/api/v1/helthcheck",helthCheckRouter)
app.use("/api/v1/auth",authroute)
app.use("/api/v1/project",projectRouter)


export default app;