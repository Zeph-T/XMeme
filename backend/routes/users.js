const express = require('express');
var router = express.Router();
const meme = require('../models/memeModel.js');//importing the User model from the model/useModel.js


router.route("/")
    .get((req, res) => {
        var query = meme.find({}, null, {limit: 100, sort: {'epoch': -1}});
        query.exec((err, memes)=>{
            if(err)
            {
                res.send(err);
            }
            else{
            res.send(memes);
            }
        });
    })
    .post(async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        var items = await meme.countDocuments({});//counting the total number of documents
        const response = req.body;
                let result;
        try {
            result = await meme.find(response);//finding if the document already exists
            if (result.length !== 0) {
                res.statusCode = 409;
                res.send("Already Exists");
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
                    //res.redirect("/memes");//redirecting to the same route
                    const id=newMeme._id;
                    res.json({"id": id});
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
                res.send("error 404");
            }
            else {
                res.send(usr);
            }
        })
    })
    .patch((req, res) => {
        var InputID = req.params.InputID;
        meme.findByIdAndUpdate(InputID, req.body, (err, doc) => {//findbyIDandUpdate is used to update the Doc using the ID as the Primary Key
            if (err) {
                res.send(err);
            }
            else {
                res.send("Updated the DOC");
            }
        })
    });

module.exports = router;