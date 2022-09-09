const express = require('express')
const router = express.Router()
var config = require('../config');
const url = config.url
var MongoClient = require('mongodb').MongoClient;


router.post('/Register', async(req,res) => {
          MongoClient.connect(url)
          .then((db)=>{
               var dbo = db.db("FriendRequestApp");
               var myobj = { username: req.body.username, password: req.body.password, Requested:[] , YouRequested:[],  Friends:[]};
               dbo.collection("Users").find({username:req.body.username}).toArray()
               .then((result)=>{
                    if(result.length==0)
                    {
                         dbo.collection("Users").insertOne(myobj)
                         .then(()=>{
                         console.log("1 document inserted");
                         res.status(208);
                         return res.send('Registed');
                         })
                         .catch((err)=>{console.log('Insertion Error');res.status(206);
                         return res.send('Insertion Error');})
                    }
                    else
                    {
                         console.log('Username Already Exists');res.status(205);
                         return res.send('Username Already Exists');
                    }
               })
               
               })
          .catch((err)=>{console.log('DB connection Error',err);res.status(206);
          res.send('DB connection Error');})
     })


     router.post('/', async(req,res) => {
          MongoClient.connect(url)
          .then((db)=>{
               var dbo = db.db("FriendRequestApp");
               var myobj = { username: req.body.username, password: req.body.password };
               dbo.collection("Users").find(myobj).toArray()
               .then((result)=>{
                    if(result.length==0)
                    {
                         console.log('Involid Credentials');res.status(206);
                         return res.send('Involid Credentials');
                    }
               else
             
               {
                    console.log('Successful Login');res.status(208);
                    return res.send('Successful Login');
               }})

               })
          })
module.exports = router;
