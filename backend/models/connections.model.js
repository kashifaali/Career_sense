// models/User.js
import mongoose from 'mongoose';

const connectionRequest = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    connectionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    Status_accepted:{
        type: Boolean,
        default: null
    }
});

const connections =  mongoose.model('connection', connectionRequest );

export default connections;