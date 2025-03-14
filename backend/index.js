const express = require('express')
const ApiRoute = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userInformation = require("./models/user.model")
ApiRoute.use(express.urlencoded({extended:false}))
ApiRoute.use(express.json())
ApiRoute.use(cors({
    origin:"https://taski-manager.vercel.app"
}))

ApiRoute.get("/", (req,res)=>{
    res.json({
        message:"Hellow"
    })
})
ApiRoute.post("/register-taskify" ,async (req,res)=>{
    try {
        const userName = req.body.user_name
        const userEmail = req.body.user_email
        const userPassword = req.body.user_password
        const salt = await bcrypt.genSalt(10)
        const scanEmail = await userInformation.findOne({user_email:userEmail})
        const hashedPass =await  bcrypt.hash(userPassword,salt)
        const alluserInfo = {
            user_name:userName,
            user_email:userEmail,
            user_password:hashedPass,
            user_task:[]
        }
        const SetJWT = {id:1,userInfo:alluserInfo}
        const Token = jwt.sign(SetJWT,process.env.TOKEN,{expiresIn:"168hr"})
            if(!scanEmail){
                await userInformation.create(alluserInfo)
                res.json({message:200,token:Token})
            }else{
                res.json({message:400})
            }
    } catch (error) {
        res.json({message:500})
    }
})

ApiRoute.post("/verifey-user" ,async(req,res)=>{
    try {
        const TOKEN = req.body.USER_TOKEN
       const verifey_token = jwt.decode(TOKEN)
       const getUserInfo  = await userInformation.findOne({user_email:verifey_token.userInfo.user_email})
       if(verifey_token){
        res.json({status:200,getUserInfo})
       }else{
        res.json({status:500})
       }
    } catch (error) {
        res.json({message:error.message})
    }
})

ApiRoute.post("/login-account", async (req, res) => {
    try {
        const userInfo = await userInformation.findOne({user_email:req.body.user_email})
        if(userInfo){
            bcrypt.compare(req.body.user_pass , userInfo.user_password,(err,result)=>{
                if(result){
                    const dcriptPayload = {id:1,userInfo}
                    const generateToken = jwt.sign(dcriptPayload,process.env.TOKEN)
                    res.json({message:200,auth_token:generateToken})
                }else{
                    res.json({message:400})
                }
            })

        }else{
            res.json({message:400})
        }
    }catch (error){
        res.json({error:500})
    }
});

ApiRoute.post("/add-task",async(req,res)=>{
    try{
        const gettingCookie = req.body.user_token
        const UserTask = {
            task_title: req.body.task_title,
            taskDiscription: req.body.taskDiscription,
            taskDate: req.body.taskDate,
            taskPrio: req.body.taskPrio,
            taskStatus: req.body.taskStatus
        }
        const decodeToken =  jwt.decode(gettingCookie)
       await userInformation.findOneAndUpdate(
            {user_email:decodeToken.userInfo.user_email},
            {$push:{user_task:UserTask}},
            {new:true}
        )
        res.json({message:200})
    }catch (error){
        res.json({message:500})
    }
})


ApiRoute.post("/task-showing" , async(req,res)=>{
    try {
        const userAuthenicator = req.body.user_auth;
        const decodeCookie = jwt.verify(userAuthenicator,process.env.TOKEN);
        const gettingUserTask = await userInformation.findOne({user_email:decodeCookie.userInfo.user_email})
        res.json(gettingUserTask.user_task)
    } catch (error) {
        res.json({message:decodeCookie})
    }
})

ApiRoute.post("/deleteing-task" , async (req,res)=>{
    try {
        const userCookieAuth =req.body.auth;
        const decodeEmail = jwt.decode(userCookieAuth)
          await userInformation.findOneAndUpdate(
            {user_email:decodeEmail.userInfo.user_email},
            {$pull:{user_task:{task_title:req.body.task_title}}},
            {new:true}
        )
        res.json({message:200})
    } catch (error) {
        res.json({message:error.message})
    }
})

ApiRoute.post("/updating-user-task", async (req,res)=>{
    try {
        const userJWT = req.body.auth_token;
        const decodeJWT = jwt.verify(userJWT,process.env.TOKEN)
        await userInformation.findOneAndUpdate(
            {user_email:decodeJWT.userInfo.user_email , "user_task.task_title":req.body.task_title_id},
            {$set:{"user_task.$":req.body.updatedTask}},
            {new:true}
        )
        res.json({message:200})
    } catch (error) {
        res.json({message:500})
    }
})

ApiRoute.post("/update-profile",async(req,res)=>{
    try {
        const authUser = req.body.user_auth
        const authenEmail = jwt.verify(authUser,process.env.TOKEN)
        const userPassKey =req.body.updated_user_info.user_password
        const saltPass = await bcrypt.genSalt(10)
        const hashed_password = await bcrypt.hash(userPassKey,saltPass)
        var userInfo = {
            user_name:req.body.updated_user_info.user_name,
            user_email:req.body.updated_user_info.user_email,
            user_password:hashed_password
        }
        const makeId = {id:1,userInfo}
         const send_token = jwt.sign(makeId,process.env.TOKEN)
        await userInformation.findOneAndUpdate(
            {user_email:authenEmail.userInfo.user_email},
            {$set:userInfo},
            {new:true}
        )
        res.json({message:200,updated_token:send_token})
    } catch (error) {
        res.json({message:500})
    }
})

ApiRoute.post("/delete-user",async(req,res)=>{
    try {
        const auten_key = req.body.auth_key;
        const decodeKey = jwt.decode(auten_key)
        await userInformation.findOneAndDelete({user_email:decodeKey.userInfo.user_email})
        res.json({message:200})
    } catch (error) {
        res.json({message:200})
    }
})

ApiRoute.post("*",(req,res)=>{
    try{
        res.json({ErrorMessage:"Wrong path"})
    }catch(error){
        res.json({ErrorMessage:"Wrong path"})
    }
})


mongoose.connect(process.env.DATABASE).then(()=>{
    console.log('Database Connected!')
}).catch((error)=>{
    console.log({message:error.message})
})

ApiRoute.listen(3000,()=>{
    console.log("Api Start On 3000")
})
