import mongoose from 'mongoose';
import config from '../../Configs/config.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); 
    }
};
