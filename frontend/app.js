const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var app = express();
app.use(bodyParser.urlencoded({ extended:true}));
const PORT = process.env.PORT || 8081;


app.set("view engine","ejs");
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-zeph:Hinatashoyo@crio.rlygl.mongodb.net/crioDB?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true,useFindAndModify:false});

var userRouter=require("./routes/users.js");//using the Express Router

app.use('/memes',userRouter);//routing to the UserRoutiner for the endpoint /memes
app.get("/",(req,res)=>{
    res.redirect("/memes");
})


app.listen(PORT,(err)=>{//listening on PORT 8081
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Server started at port 8081");
    }
})


