const express = require('express')
const router = express.Router()
var config = require('../config');
const url = config.url
var MongoClient = require('mongodb').MongoClient;


router.post('/', async(req,res) => {
var resultant=[]
y=''
          MongoClient.connect(url)
          .then((db)=>{
               var dbo = db.db("FriendRequestApp");
               dbo.collection("Users").findOne({username:req.body.user})
               .then((result)=>{

                    var t=[...result.Requested,...result.YouRequested,...result.Friends,req.body.user]
                    dbo.collection("Users").find({username:{$nin: t}}).project({username:1,_id:0}).skip(parseInt(req.body.startIndex)).limit(2).toArray()
                    .then((res1)=>{
                        console.log(res1)
                        if(res1.length==0)
                        {
                            res.statusCode=208               
                            return res.send('No data')
                        }
                        resultant=res1.map((e)=> {return e.username})
                        if(resultant.length==res1.length)
                        {res.statusCode=200    
                        return res.json({"suggest":resultant,"updatedStartIndex":parseInt(req.body.startIndex)+2})}
                                        })
                   
                    
                        
                    
               })
          .catch((err)=>{console.log('DB connection Error',err);res.status(206);
          res.send('DB connection Error');})
     })
    })
     module.exports = router;
