const router = require("express").Router()
const verifyToken = require("../middleware/authMiddleware")
const Post = require("../models/Post")
router.post("/create",verifyToken,async(req,res)=>{
    try {
    const currentUser = req.user.id
    const {title,content,category} = req.body
    if(!title || !content){
        return res.status(400).json({
            status:false,
            message:"Please fill all fields"
        })
    }
    const postTitle = await Post.find({title})
    if(postTitle.length > 0){
        return res.status(400).json({
            status:false,
            message:"Post title already exists"
        })
    }
    const newPost = new Post({
        title:title,
        content:content,
        author:currentUser,
        category:category
    })
    await newPost.save()
    res.status(201).json({
        status:true,
        message:"Post added successfully"
    })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error.message,
          });
    }
})

router.put("/:id", verifyToken,async (req, res) => {
    try {
      const postId = req.params.id;
      const updatedData = req.body;
  
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({
          status: false,
          message: "Post not found",
        });
      }
  
      const updatedPost = await Post.findByIdAndUpdate(postId, updatedData, {
        new: true,
        runValidators: true,
      });
  
      return res.status(200).json({
        status: true,
        message: "Post updated successfully",
        data: updatedPost,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  });

router.get("/",verifyToken,async (req,res)=>{
    try {
        const currentUser=req.user.id
        console.log(currentUser)
        const posts = await Post.find({author:currentUser})
        .populate(
            "author",
            "name email"
        )
        .populate(
            "category",
            "_id name"
        );
        if(!posts){
            return res.status(404).json({
                status:false,
                message:"No posts found"
            })
        }
        res.status(200).json({
            status:true,
            message:"Posts found successfully",
            data:posts
        })
    } catch (error) {
        
    }
})
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", verifyToken,async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: false,
        message: "Post not found",
      });
    }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json({
      status: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

module.exports = router
