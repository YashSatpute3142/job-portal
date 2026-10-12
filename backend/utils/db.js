import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("MongoDB connected successfully...");
    } catch (error) {
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Underlying cause:", error.cause);
        console.error("Full error:", error);
    }
};

export default connectDB;