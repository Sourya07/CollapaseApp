import express, { Request, Response } from 'express';
import taskRoutes from './routes/User';
import courseRoutes from './routes/Course';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL!)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1', taskRoutes);
app.use('/api/v1', courseRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello there');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
