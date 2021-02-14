const mongoose = require('mongoose');

const memeSchema= mongoose.Schema({
    _id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
})

const Meme=mongoose.model("meme",memeSchema);
module.exports = Meme;