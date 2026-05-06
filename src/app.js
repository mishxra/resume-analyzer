import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import resumeRouter from "./routes/resume.routes.js"

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use("/api", resumeRouter)

export { app }