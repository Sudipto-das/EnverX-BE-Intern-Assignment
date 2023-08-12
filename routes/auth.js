const jwt = require('jsonwebtoken')
const express = require('express')
const {User} =require('../database')
const router = express.Router()
const {SECRETKEY} = require('../middleware')

router.post('/signup', async (req,res)=>{
    const {username,password} = req.body

    const user = await User.findOne({username})
    if(user){
       return res.status(403).json({message:'user Already exsits'})
    }
    const newUser = new User ({username,password})
    await newUser.save()
    const token = jwt.sign({username:newUser.username,id:newUser._id},SECRETKEY,{expiresIn:'1h'})
    return res.status(200).json({message:'user register sucsessfully'},token)
})

router.post('/login', async (req,res)=>{
    const {username,password} = req.body

    const user = await User.findOne({username,password})

    if(user){
        const token = jwt.sign({username:user.username,id:user._id},SECRETKEY,{expiresIn:'1h'})
        return res.status(200).json({message:'login sucsessfully',token}) 
    }
    return res.status(403).json({message:'invalid username or password'})
})

module.exports = router