import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });

        if (userFound)
            return res.status(400).json("The email you want to use already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        const randomPic = `https://avatar.iran.liara.run/username?username=${username}`;


        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profilePic: randomPic,

        });

        const savedUser = await newUser.save();
        const token = await createAccessToken({ id: savedUser._id });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
            sameSite: 'None', // Necesario para solicitudes cross-site
        });

        res.json({
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            profilePic: savedUser.profilePic,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json("User not found");
        const passwordMatches = await bcrypt.compare(password, userFound.password);
        if (!passwordMatches) return res.status(400).json("Incorrect password");

        const token = await createAccessToken({ id: userFound._id });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
            sameSite: 'None', // Necesario para solicitudes cross-site
        });

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            profilePic: userFound.profilePic,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const logout = (_, res) => {
    try {
        res.cookie("token", "", {
            expires: new Date(0),
        });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};