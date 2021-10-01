const router =require("express").Router()

const service=require("../services/users.servive")

router.post("/registration",service.register)

router.post("/login",service.login)

module.exports=router