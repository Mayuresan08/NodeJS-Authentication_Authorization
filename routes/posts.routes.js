const express=require("express")
const router= express.Router()

const service= require('../services/post.services')

    router.get("/",service.findPosts)

    router.post("/",service.insertPosts)

    router.put("/:id",service.updatePosts)

    router.delete("/:id",service.deletePosts)

    module.exports=router