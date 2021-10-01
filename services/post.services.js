 //to convert string to objectId
const { ObjectId } = require("mongodb");


//importing mongodbClient
const mongo=require("../mongo");


const service={
    //Get Method
    async findPosts(req,res,next){
        //logic in db to retrieve data
        try{
          //using .toArray() method to get response as Array of objects for find()
         //displaying posts for the user who logged in---Authorization
        const data= await mongo.posts.find({userId:req.user.userId}).toArray()
        // console.log(data)
     res.send(data)
        }
        catch(err)
        {
          console.log("Error in Get data",err)
        }
    },


    //Post-Method
    async insertPosts(req,res,next){
        //accessing req-body will returns undefined ,in-order to access req.body we have to use a middleware express.json()
        console.log( req.body)

        try{
        //logic in db to insert document
        const data=await mongo.posts.insertOne({...req.body,userId:req.user.userId})
        console.log(data)

        res.status(201).send({...req.body,_id:data.insertedId})
        }
        
        catch(err)
        {
          console.log("Error in Post data",err)
        }
      },

      //Put-method
      async updatePosts(req,res,next){
        console.log(req.params.id)
        try{
            //logic in db to update 

            //here since _id is of type objectId , need to convert string to objectId using {objectId} from "mongo"
            
            //using-updateOne()
            // const data=await mongo.db.collection("posts").updateOne({_id:ObjectId(req.params.id)},{$set:{...req.body}})

            //using findOneAndUpdate()
            const data=await mongo.posts
                              .findOneAndUpdate({_id:ObjectId(req.params.id)},
                                                  {$set:{...req.body}},
                                                  {ReturnDocument: "after" })
        res.send(data)
        }
        catch(err)
        {
          console.log("Error in Put data",err) 
        }
    },


    //delete method
    async deletePosts(req,res,next){
        console.log(req.params.id)
        //logic in  db to delete data 
        try{

          //Authorization-- verfiy that user to be deleted is the owner of the post
          const selectPosts=await mongo.posts.findOne({_id:ObjectId(req.params.id),userId:req.user.userId})
          console.log(selectPosts)
          if(!selectPosts)
          { console.log("in")
            return res.status(401).send("you are not authorized to delete this post")
           }
         await mongo.posts.deleteOne({_id:ObjectId(req.params.id)})
        res.end()
        }
        catch(err)
        {
          console.log("Error in Delete data",err) 
        }
    }


}
module.exports=service