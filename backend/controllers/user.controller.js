import User from "../models/user.model.js";
import Profile from '../models/profile.model.js';
import bcyrpt from 'bcrypt';

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

    return res.status(200).json({ message: "Successful login", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
