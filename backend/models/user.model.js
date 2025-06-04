import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: 'default.png' },
    token: { type: String, default: '' }
}, { timestamps: true }); // ✅ adds createdAt and updatedAt automatically

const User = mongoose.model("User", UserSchema);

export default User;
