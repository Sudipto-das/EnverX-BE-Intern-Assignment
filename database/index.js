const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:String,
    password:String
})
const blogSchema = new mongoose.Schema({
    title:String,
    description:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const User = mongoose.model('User',userSchema);
const Blog = mongoose.model('Blog',blogSchema);

module.exports={
    User,
    Blog
}