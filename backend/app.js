const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var app = express();
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
require("dotenv").config();
const url=(process.env.NODE_ENV=="production")?(process.env.DB_PRODUCTION):(process.env.DB_LOCAL); // using different db for prodution and development
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true,useFindAndModify:false});
const PORT = process.env.PORT || 8081;

var userRouter=require("./routes/users.js");//using the Express Router

app.use('/memes',userRouter);//routing to the UserRouter for the endpoint /memes



app.listen(PORT,(err)=>{//listening on PORT 3000
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Server started at port 8081");
    }
})


