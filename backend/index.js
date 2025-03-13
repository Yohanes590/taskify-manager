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
    origin:"http://localhost:5173"
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

ApiRoute.post("/verifey-user" ,(req,res)=>{
    try {
        const TOKEN = req.body.USER_TOKEN
       const verifey_token = jwt.decode(TOKEN)
       if(verifey_token){
        res.json({status:200,verifey_token})
       }else{
        res.json({status:500})
       }
    } catch (error) {
        res.json({message:500})
    }
})

ApiRoute.post("/login-account" ,async (req,res)=>{
    try {
        const userEmail = req.body.userEmail;
        const userPass = req.body.userPass;
        const emailInfo = await userInformation.findOne({user_email:userEmail})
        if(emailInfo){
        const SetInfo = {id:1,userInfo:emailInfo}
            bcrypt.compare(userPass,emailInfo.user_password,(err,result)=>{
                if(err){
                    res.json({message:500,})
                }else if(result){
                  const LoginToken=  jwt.sign(SetInfo, process.env.TOKEN,{expiresIn:"168hr"})
                    res.json({message:200,token:LoginToken})
                }else{
                    res.json({message:400,})
                }
            })
        }
    } catch (error) {
        res.json({message:500})
    }
})


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
        const decodeCookie = jwt.decode(userAuthenicator);
        const gettingUserTask = await userInformation.findOne({user_email:decodeCookie.userInfo.user_email})
        res.json(gettingUserTask.user_task)
    } catch (error) {
        res.json({message:500})
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
        const decodeJWT = jwt.decode(userJWT)
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
