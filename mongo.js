//mongodb package which provides a client for connecting mongodb
const {MongoClient}=require("mongodb");
// const { connect } = require("./routes/posts.routes");
//mongodb url and db_name
const MONGODB_URL="mongodb://localhost:27017";
const MONGODB_NAME="guvi_posts";

//creating a instance of MongoClient
const client = new MongoClient(MONGODB_URL)

//Now to establish connection ,creating a connect method and exporting

module.exports={
    //db 
    db:null,

    //collections
    posts:null,
    users:null,

    //method to connect mongoDB
    async connect()
    {
        await client.connect();
        console.log("Connected to MongoDB",MONGODB_URL)

        //now selecting the db
        this.db=client.db(MONGODB_NAME)
        console.log("Database selected",MONGODB_NAME)
        this.posts=this.db.collection("posts")
        this.users=this.db.collection("users")
    }
}
