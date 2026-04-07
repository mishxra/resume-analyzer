import express from 'express';
import dotenv from 'dotenv';

const app = express()

const PORT= process.env.PORT || 8000

dotenv.config()

app.listen(process.env.PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})
