const express = require("express");
const { authenticateJWT, SECRETKEY } = require("../middleware");
const router = express.Router();
const { Blog } = require("../database");

router.post("/posts", authenticateJWT, async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;
  try {
    const blog = new Blog({ title, description, user: userId });
    blog.save().then((newBlog) => {
      res
        .status(201)
        .json({ message: "Blog posted successfully", data: newBlog });
    });
  } catch (error) {
    console.error("Error posting blog", error);
    res
      .status(500)
      .json({ message: "An error occurred while posting the blog" });
  }
});
router.get("/posts", authenticateJWT, async (req, res) => {
  try {
    const allblogs = await Blog.find();
    return res.status(200).json({ allblogs });
  } catch (error) {
    console.error("Error retriving blogs", error);
  }
});
router.put("/posts/:id", authenticateJWT, async (req, res) => {
    const userId = req.user.id
    const blogId = req.params.id;
    const {title,description} = req.body
  try {
    const updatedBlog = await Blog.findOneAndUpdate(
        { _id: blogId, user: userId }, // Update only if the user matches
        { title, description, user: userId }, // Updated fields
        { new: true } // Return the updated document
    );
    if (updatedBlog) {
      return res.status(200).json({ massage: "blog updated", blog: updatedBlog });
    } else {
      return res.status(403).json({ message: "blog not found" });
    }
  } catch (error) {
    console.error("Error in updating blog", error);
  }
});

router.get("/posts/:id",authenticateJWT,async (req,res)=>{
  try{
      const blog = await Blog.find({_id:req.params.id})
      if(blog){
        return res.json({blog})
      }
      else{
        return res.status(403).json({message:'blog not found!'})
      }
  } catch(error){
      console.error("error geting blog post",error)
      return res.status(500).json({ message: 'Internal server error' });
  }
})

router.delete('/posts/:id',authenticateJWT,async (req,res)=>{
  try{
    const blog = await Blog.findByIdAndDelete({_id:req.params.id})
    if(blog){

      return res.json({message:'blog post deleted sucsessfully'})
    }
    else{
      return res.status(404).json({message:'blog post not found!'})
    }
} catch(error){
    console.error("Error deleting blog post",error)
    return res.status(500).json({ message: 'Internal server error' });
}
})

module.exports = router;
