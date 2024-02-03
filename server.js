const express = require('express')
require('dotenv').config()
const app = express();
app.use(express.json())
require("./config/dbConnect").dbConnect()
const port = process.env.port
app.listen(port,()=>
{
    console.log(`app is running on ${port}`);
})
const routes = require('./routes/Authroutes')
app.use('/api/v1',routes)