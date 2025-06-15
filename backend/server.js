import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'
import postRoutes from './routes/posts.routes.js';


dotenv.config();

const app = express();

app.use(express.json()); 
app.use(cors()); 
app.use(express.static("uploads"));

app.use(userRoutes);
app.use(postRoutes); 


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Example simple route
app.get('/', (req, res) => {
    res.send('Welcome to LinkedIn Clone API 🚀');
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
