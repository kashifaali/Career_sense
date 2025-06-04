import User from "../models/user.model.js";
import Profile from '../models/profile.model.js';
import bcyrpt from 'bcrypt';
import crypto from 'crypto';
import PDFDocument from 'pdfkit';
import fs from "fs";
import connections from "../models/connections.model.js";



const converUserDataToPDF = (userData)=>{
  const doc = new PDFDocument();

  const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";
  const stream = fs.createWriteStream("uploads/" + outputPath);
  doc.pipe(stream);

  doc.image(`uploads/${userData.userId.profilePicture}`,{align:"center",width: 100})
  doc.fontSize(14).text(`Name: ${userData.userId.name}`);
  doc.fontSize(14).text(`Username: ${userData.userId.username}`);
  doc.fontSize(14).text(`Email: ${userData.userId.email}`);
  doc.fontSize(14).text(`Bio: ${userData.bio}`);
  doc.fontSize(14).text(`Current Position: ${userData.currentPost}`);

  doc.fontSize(14).text("Past work");
  userData.postWork.forEach((work,index)=>{
  doc.fontSize(14).text(`Company Name: ${work.company}`);
  doc.fontSize(14).text(`Position: ${work.position}`);
  doc.fontSize(14).text(`Years: ${work.years}`);

  })
  
  doc.end();

  return outputPath;

}

export const register = async (req, res)=>{
    try{
        const {name, email, password, username} = req.body;
        if(!name || !email || !password || !name){return res.send(400).json({message: "all fields are required"})}

        const user = await User.findOne({
            email,
        });

        if(user){return res.status(400).json({message: "User already exist"})}

        const hashedPassword = await bcyrpt.hash(password, 10);

        const newuser = new User({
            name,
            email, 
            password: hashedPassword,
            username
        })

        await newuser.save();

const profile = new Profile({userId: newuser._id});

await profile.save(); 

        return res.send({message: "user created successfully"});
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }

}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcyrpt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await User.updateOne({_id: user._id}, {token});

    return res.status(200).json({ message: "Successful login", token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const UploadProfilePicture = async (req,res)=>{
  const {token} = req.body;
  try{
    const user = await User.findOne({token: token});

    if(!user){
      return res.send(404).json({message: "user not found"});
    }

    user.profilePicture = req.file.filename; 

    await user.save();

    return res.json({message: "profile image is updated"});


  }
  catch(error){
  return res.status(500).json({ message: error.message });
  }
}

export const updateProfilePicture = async(req,res)=>{
 
  try{

    const {token, ...newUserData} = req.body;
    const user = await User.findOne({token: token});
    if(!user){
      return res.send(404).json({message: "user not found"});
    }

    const {username, email} = newUserData;

    const existingUser = await User.find({$or: [{username}, {email}]});

    if(existingUser){
      if(existingUser || String(existingUser._id) !== String(user._id)){

      return res.send(400).json({message: "User already exist"});

      }
    }

    Object.assign(user, newUserData);
    await user.save();

    return res.json({message: "user updated"});


  }
  catch(error){
  return res.status(500).json({ message: error.message });
  }

}


export const getUserProfile = async(req,res)=>{
  try{
    const {token} = req.body;
    const user = await User.findOne({token: token});

    if(!user){
      return res.status(404).json({message: "user not found"});
    }

    const userProfile = await Profile.findOne({userId: user._id})
    .populate('userId', 'name email username profilePicture');

    return res.json(userProfile)
  }
  catch(error){
  return res.status(500).json({ message: error.message });
  }
}

export const updateProfileData = async (req,res)=>{
  try{

    const {token, ...newProfileData} = req.body;
    const userProfile = await User.findOne({token: token});

    if(!userProfile){
      return res.status(404).json({message: "user not found"});
    }

    const profile_to_update = await Profile.findOne({userId: userProfile._id});
    Object.assign(profile_to_update, newProfileData);

    await profile_to_update.save();

    return res.status(500).json({message: "Profile updated"});


  }
  catch(error){
  return res.status(500).json({ message: error.message });
  }
}

export const getAllUserProfile = async(req,res)=>{
  try{
    const profiles = await Profile.find().populate('userId', 'name username email profilePicture');
    return res.json({profiles});
  }
  catch(error){
  return res.status(500).json({ message: error.message });
  }
}

export const downloadProfile = async (req,res)=>{
  const user_id = req.query.id;
  const userProfile = await Profile.findOne({userId: user_id})
  .populate('userId', 'name username email profilePicture');

  let outputPath = await converUserDataToPDF(userProfile);

  return res.json({message: outputPath});
}

export const sendConnectionRequest = async (req,res)=>{
  const {token, connectionId} = req.body;

  try{
    const user = await User.findOne({token});

    if(!user){
      return res.status(404).json({message: "user not found"})
    }

    const connectionUser = await User.findOne({_id: connectoinId});

    if(!connectionUser){
      return res.status(404).json({message: "connection User not found"})
    }

    const existingRequest = await Connection.findOne(
      {
        userId: user._id,
        connectionId: connectionUser._id
      }
    )

    if(existingRequest){
      return res.status(400).json({message: "request already send"});

    }

    const request = new Connection({
      userId: user._id,
      connectionId: connectionUser._id
    });

    await request.save();

    return res.json({message: "request sent"})

  }
  catch(error){
  return res.status(500).json({ message: error.message });
  }
}


export const getMyConnectionRequests = async (req,res)=>{
  const {token} = req.body;

  try{
    const user = await User.findOne({token});

     if(!user){
      return res.status(404).json({message: "user not found"})
    }

    const connection = await connections.find({userId: user._id})
    .populate('connectionId','name username email profilePicture');

    return res.json({connection})
  }
  catch(error){
  return res.status(500).json({ message: error.message });
  }
}


export const whatAreMyConnections = async (req,res)=>{
  const {token} = req.body;

  try{
    const user = await User.findOne({token});

    if(!user){
      return res.status(404).json({message: "user not found"})
    }

    const connection = await connections.find({connectionId: user._id})
    .populate('userId', 'name username email profilePicture');

    return res.json(connection);
  }
  catch(error){
  return res.status(500).json({ message: error.message });
  }
}

export const acceptConnectionRequest = async (req,res)=>{
  const {token, requestId, action_type} = req.body;

  try{
    const user = await User.findOne({token});

    if(!user){
      return res.status(404).json({message: "user not found"})
    }

    const connection = await connections.findOne({_id: requestId});

    if(!connection){
      return res.status(404).json({message:"connection not found"})
    }

    if(action.type === "accept"){
      connection.status_accepted = true;
    }
    else{
      connection.status_accepted = false;
    }

    await connection.save();
    return res.json({message: "request updated"});
  }
  catch(error){
  return res.status(500).json({ message: error.message });
  }
}

export const commentPost = async (req, res)=>{
  const {token, post_id, commentBody} = req.body;

  try{
    const user = await User.findOne({token: token}).select("_id");

    if(!user){
      return res.status(404).json({message: "user not found"})
    }

    const post = await Post.findOne({
      _id: post_id
    });

     if(!post){
            return res.status(404).json({message: "post not found"})
        }

      const comment = new Comment({
        userId: user._id,
        postId: post_id,
        comment: commentBody
      });

      await comment.save();

      return res.status(200).json({message: "comment added"})



  }
  catch(error){
  return res.status(500).json({ message: error.message });
  }
}

export const get_comments_by_post = async (req,res)=>{
  const {post_id} = req.body;

  try{
    const post = await Post.findOne({_id: post_id});

    if(!post){
      return res.status(404).json({message: "post not found"})
    }

    return res.json({comments: post.comments})
  }

  catch(error){
  return res.status(500).json({ message: error.message });
  }
}


export const increment_likes = async (req,res)=>{
  const {post_id} = req.body;

  try{
    const post = await Post.findOne({_id: post_id});

   if(!post){
      return res.status(404).json({message: "post not found"})
    }
    post.likes = post.likes + 1;

    await post.save();

    return res.json({message: "likes increment"})
  }

  catch(error){
  return res.status(500).json({ message: error.message });
  }
}
