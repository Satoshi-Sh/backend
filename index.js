const express = require("express")
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const blogapiRouter = require('./routes/blogapiRoutes')

const app = express();

app.use('/blogapi', blogapiRouter)



app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})



