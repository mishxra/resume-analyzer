import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
import { app } from "./src/app.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT= process.env.PORT || 8000

dotenv.config()

app.use(express.static(path.join(__dirname, "public")))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"))
})

app.listen(process.env.PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})
