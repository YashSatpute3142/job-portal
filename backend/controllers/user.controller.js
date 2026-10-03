
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataUri } from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;

        if (!fullName || !email || !phoneNumber || !role || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exist with this email",
                success: false
            });
        }
        const file = req.file;

        // Cloudinary
        let cloudResponse;

        if (file) {
            const fileUri = getDataUri(file);

            cloudResponse = await cloudinary.uploader.upload(
                fileUri.content
            );

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(200).json({
            message: "Account created successfully",
            success: true,
        });

    } catch (error) {
        console.error(error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !role || !password) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or Password",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or Password",
                success: false,
            });
        }

        // Check role
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role",
                success: false,
            });
        }

        const tokenData = {
            userId: user._id
        };

        const token = jwt.sign(
            tokenData,
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        }).json({
            message: `Welcome Back ${user.fullName}`,
            user,
            success: true,
        });

    } catch (error) {
        console.error(error);
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {
            maxAge: 0
        }).json({
            message: "Logged out successfully",
            success: true
        });

    } catch (error) {
        console.error(error);
    }
};


export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        // Cloudinary
        let cloudResponse;

        if (file) {
            const fileUri = getDataUri(file);

            cloudResponse = await cloudinary.uploader.upload(
                fileUri.content,
                {
                    resource_type: "raw",
                    type: "upload",
                    access_mode: "public",
                    format: "pdf",
                }
            );

        }

        let skillsArray;

        if (skills) {
            skillsArray = skills.split(",");
        }

        console.log("CLOUDINARY UPLOAD DONE");

        const userId = req.id;
        console.log("USER ID FROM AUTH:", userId);

        let user = await User.findById(userId);
        console.log("USER FOUND:", user);

        if (!user) {
            console.log("USER NOT FOUND");

            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }


        // Updating data
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // Resume
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }

        console.log("SAVING USER...");

        await user.save();

        console.log("USER SAVED SUCCESSFULLY");

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        console.log("SENDING SUCCESS RESPONSE");

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true,
        });

    } catch (error) {
        console.error("UPDATE PROFILE ERROR:", error);

        return res.status(500).json({
            message: "Something went wrong while updating profile",
            success: false,
        });
    }
};



