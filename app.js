//importing express module
const express= require("express");
//creating server
const app=express();
//calling the router for posts and users
const postRoutes=require("./routes/posts.routes");
const userRoutes=require("./routes/users.routes")

//calling the mongodbclient from mongo.js
const mongo=require("./mongo");

//importing JWT module
const jwt=require("jsonwebtoken");


//db should be connected before server is started, cannot directly connect
// mongo.connect()
//in-order to connect to db and then start the server, wrapping all other middleware in IIFE and using promises (Async and await)
(async ()=>{
    try{
        await mongo.connect();

        //common-middleware for every request
//using a express.json() to convert req.body from raw to json 
app.use(express.json())
//calling middleware on mountpath :/users
app.use("/users",userRoutes)

//validating the token for every request using jwt.verify()
app.use((req,res,next)=>{
    //retreiving the token from header
    const token=req.headers["auth-token"]
    console.log(token)
    //checking token-present
    if(!token)  return res.staus(401).send("Please log in again")
    //validating token
    try{
    req.user=jwt.verify(token,"Guv!@123");
    
    console.log(req.user)
    next()
    }
    catch(err)
    {
        res.status(401).send(err)
    }
    
})

//calling middleware on mountpath :/posts 
app.use("/posts", postRoutes)


//starting the server
app.listen(3001,()=>{console.log("server running on port 3001")})


        }
    catch(err)
    {
        console.log("Error",err)
    }

})();
