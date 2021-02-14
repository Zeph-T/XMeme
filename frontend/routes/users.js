const { response } = require('express');
const express = require('express');
var router = express.Router();
const meme = require('../models/memeModel.js');//importing the User model from the model/useModel.js


router.route("/")
    .get(async (req, res) => {

        
        var query = meme.find({}, null, {limit: 100, sort: {'epoch': -1}});
        query.exec((err, memes)=>{
            if(err)
            {
                res.send(err);
            }
            else{
            res.render("index",{memes:memes});
            }
        });
        

    })
    .post(async (req, res) => {

        var items = await meme.countDocuments({});//counting the total number of documents
        const response = req.body;
        let result;
        try {
            result = await meme.find(response);//finding if the document already exists
            if (result.length !== 0) {
                res.statusCode = 409;
                res.send("Already Exists");
               // console.log(result);
            }
            else {
                const newMeme = new meme({//creating new Document
                    _id: ++items,//assigning the ID to the Document
                    name: response.name,
                    url: response.url,
                    caption: response.caption
                })

                try{
                    await newMeme.save();//saving the document into the database
                    res.redirect("/memes");//redirecting to the same route
                }
                catch(err){
                    res.send(err);
                }

            }
        }
        catch (err) {
            res.send(err);
        }

    });

router.route("/:InputID")//use of params
    .get((req, res) => {
        var InputID = req.params.InputID;
        meme.findById(InputID, (err, usr) => {//checking if the given ID exists
            if (err) {
                res.send(err);
            }
            else if(usr === null)
            {
                res.statusCode = 404;
                res.render("error");
            }
            else {
                res.send(usr);
            }
        })
    })
    .post((req, res) => {
        var InputID = req.params.InputID;
        var user_url=req.body.url;
        var user_caption=req.body.caption;
        let b;
       // console.log(req.body);
        if(user_caption === "")//if the user hasn't filled the Caption to update
        {
            b={url: user_url };
        }
        else if(user_url === "")//if the user hasn't filled the Image URL to update
        {
            b={caption : user_caption}
        }
        else 
        {
            b=req.body;
        }
        meme.findByIdAndUpdate(InputID,b, (err, doc) => {//findbyIDandUpdate is used to update the Doc using the ID as the Primary Key
            if (err) {
                res.send(err);
            }
            else {
                res.redirect("/memes");
            }
        })
    });

module.exports = router;