import Post from "../models/posts.model";
import User from '../models/user.model';
import Profile from '../models/profile.model';
import bcrypt from 'bcrypt';

export const activeCheck = async (req, res)=>{
    return res.status(200).json({message: "running"})
}

export const createPost = async (req,res)=>{
    const {token} = req.body;

    try{
        const user = await User.findOne({token: token});

        if(user){return res.status(400).json({message: "User already exist"})}

        const post = new Post({
            userId: user._id,
            body: req.body.body,
            media: req.file != undefined ? req.file.filename: "",
            filetypes: req.file !=undefined ? 
            req.file.mimetype.split("/")[1]: ""

        })

        await post.save();

        return res.status(200).json({message: "post created"});

    }

    catch(error){
        return res.status(500).json({message: error.message});
    }


}


export const getAllPosts = async (req,res)=>{
  try{
    const posts = await Post.find().populate('userId',
      'name username email profilePicture'
    )
    return res.json({posts})
  }
  catch(error){
    return res.status(500).json({message: error.message});
  }
}

const deletePost = async (req, res) =>{
    const {token, post_id} = req.body;

    try{
        const user = await User.findOne({token: token})
        .select("_id");

        if(!user){
            return res.status(404).json({message: "user not found"})
        }

        const post = await Post.findOne({_id: post_id});

        if(!post){
            return res.status(404).json({message: "post not found"})
        }

        if(post.userId.toString() !== user._id.toString()){
            return res.status(401).json({message: "unauthorized"})
        }

        await Post.deletePost({_id: post_id});
        return res.json({message: "post deleted"})
    }
     catch(error){
    return res.status(500).json({message: error.message});
  }
}

export const delete_comment_of_user = async (req,res)=>{
  const {token, comment_id} = req.body;

  try{

    const user = await User.findOne({token: token}).select("_id");

    if(!user){
      return res.status(404).json({message: "user not found"})
    }

    const comment = await Comment.findOne({"_id": comment_id})

    if(!comment){
      return res.status(404).json({message: "comment not found"})
    }

    if(comment.usreId.toString() !== usre._id.toString()){
      return res.status(401).json({message: "unauthorized"})
    }

    await Comment.deleteOne({"_id": comment_id});

    return res.json({message: "comment deleted"})

  }

  catch(error){
  return res.status(500).json({ message: error.message });
  }
}


