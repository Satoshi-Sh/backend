const express = require("express");
const connectMongoServer = require("./mongoConnect");
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const blogapiRouter = require('./routes/blogapiRoutes')
const path = require('path')
const cors = require('cors')


const app = express();

// Enable body parser 
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// cors setting 
const corsOption = {
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOption))


// set static folder 

app.use(express.static(path.join(__dirname,'public')))




app.use('/blogapi', blogapiRouter)


connectMongoServer()


app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})



