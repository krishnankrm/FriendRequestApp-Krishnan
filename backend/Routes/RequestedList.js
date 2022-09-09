const express = require('express')
const router = express.Router()
var config = require('../config');
const url = config.url
var MongoClient = require('mongodb').MongoClient;



     router.post('/friendship', async(req,res) => {

          MongoClient.connect(url)
          .then((db)=>{
               var dbo = db.db("FriendRequestApp");
               dbo.collection("Users").findOne({ username: req.body.user},{ projection: { _id: 0, Friends:1} })
               .then((result)=>{

                if(result.Friends.length===0 )  
                    {console.log('No data')    
                    res.statusCode=208               
                    return res.send('No data')}
                else
                    {
                         res.statusCode=200               
                        return res.json(result.Friends)
                    }
                })
               })
          })

          router.post('/YouRequestedList', async(req,res) => {

               MongoClient.connect(url)
               .then((db)=>{
                    var dbo = db.db("FriendRequestApp");
                    dbo.collection("Users").findOne({ username: req.body.user},{ projection: { _id: 0, YouRequested:1} })
                    .then((result)=>{
     
                     if(result.YouRequested.length===0 )  
                         {console.log('No data')    
                         res.statusCode=208               
                         return res.send('No data')}
                     else
                         {
                              res.statusCode=200               
                             return res.json(result.YouRequested)
                         }
                     })
                    })
               })

          router.post('/', async(req,res) => {

               MongoClient.connect(url)
               .then((db)=>{
                    var dbo = db.db("FriendRequestApp");
                    dbo.collection("Users").findOne({ username: req.body.user},{ projection: { _id: 0, Requested:1} })
                    .then((result)=>{
     
                     if(result.Requested.length===0 )  
                         {console.log('No data')    
                         res.statusCode=208               
                         return res.send('No data')}
                     else
                         {
                              res.statusCode=200               
                             return res.json(result)
                         }
                     })
                    })
               })
     
     router.post('/confirm', async(req,res) => {
        console.log(req.body)

          MongoClient.connect(url)
          .then((db)=>{
               var dbo = db.db("FriendRequestApp");
               dbo.collection("Users").findOne({ username: req.body.user})
               .then((result)=>{
                    var arr=result.Requested.filter(item => item !== req.body.friend)
                    var newfriendlist=[...result.Friends,req.body.friend ]
                    var myquery = { username: req.body.user}
                    var newvalues = { $set: {Requested: arr, Friends:newfriendlist } };
                    dbo.collection("Users").updateOne(myquery, newvalues)
                    .then((res12)=>{console.log('done')})
                    
                })

                dbo.collection("Users").findOne({ username: req.body.friend})
                .then((result)=>{
                    var arr=result.YouRequested.filter(item => item !== req.body.user)

                     var newfriendlist=[...result.Friends,req.body.user ]
                     var myquery = { username: req.body.friend}
                     var newvalues = { $set: {YouRequested: arr, Friends:newfriendlist } };
                     dbo.collection("Users").updateOne(myquery, newvalues)
                     .then((res12)=>{return res.send('done')})
                     
                 })
               
               })
          })

          router.post('/delete', async(req,res) => {
               console.log(req.body)
       
                 MongoClient.connect(url)
                 .then((db)=>{
                      var dbo = db.db("FriendRequestApp");
                      dbo.collection("Users").findOne({ username: req.body.user})
                      .then((result)=>{
                           var arr=result.Requested.filter(item => item !== req.body.requested)
                           var myquery = { username: req.body.user}
                           var newvalues = { $set: {Requested: arr } };
                           dbo.collection("Users").updateOne(myquery, newvalues)
                           .then((res12)=>{console.log('done')})
                           
                       })
                       dbo.collection("Users").findOne({ username: req.body.requested})
                      .then((result)=>{
                           var arr=result.YouRequested.filter(item => item !== req.body.user)
                           var myquery = { username: req.body.requested}
                           var newvalues = { $set: {YouRequested: arr } };
                           dbo.collection("Users").updateOne(myquery, newvalues)
                           .then((res12)=>{return res.send('done')})
                           
                       })
       
                      
                      })
                 })


                 router.post('/mutual', async(req,res) => {
                    console.log(req.body)
            
                      MongoClient.connect(url)
                      .then((db)=>{
                           var dbo = db.db("FriendRequestApp");
                       
                               
                                dbo.collection("Users").find({$or:[{ username: req.body.user},{username: req.body.frd}]}).toArray()
                                .then((result)=>{
                                  if(result.length==2)
                                  { const filteredArray = result[0].Friends.filter(value => result[1].Friends.includes(value));
                                   if(filteredArray.length!=0)
                                        {
                                             res.statusCode=200         
                                             console.log(filteredArray)      
                                             return res.json(filteredArray)
                                        }
                                   else
                                        {
                                             res.statusCode=208  
                                             console.log('No Data')      
           
                                             return res.send('No Data')
                                        }}
                                   
                                        else
                                        {
                                             res.statusCode=201 
                                             console.log('Invalid Searched Person')      
           
                                             return res.send('Invalid Searched Person')
                                        }

                                })
                                
                      
            
                           
                           })
                      })
          
                      
                 router.post('/Addfriend', async(req,res) => {
                    console.log(req.body)
            
                      MongoClient.connect(url)
                      .then((db)=>{
                           var dbo = db.db("FriendRequestApp");
                       
                           dbo.collection("Users").findOne({ username: req.body.user})
                           .then((result)=>{
                                var arr=[...result.YouRequested,req.body.frd]
                                var myquery = { username: req.body.user}
                                var newvalues = { $set: {YouRequested: arr } };
                                dbo.collection("Users").updateOne(myquery, newvalues)
                                .then((res12)=>{console.log('done')})
                                
                            })
                                
                            dbo.collection("Users").findOne({ username: req.body.frd})
                            .then((result)=>{
                                 var arr=[...result.Requested,req.body.user]
                                 var myquery = { username: req.body.frd}
                                 var newvalues = { $set: {Requested: arr } };
                                 dbo.collection("Users").updateOne(myquery, newvalues)
                                 .then((res12)=>{return res.send('done')})
                                 
                             })    
            
                           
                           })
                      })
module.exports = router;
