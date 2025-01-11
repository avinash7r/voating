import Users from "../user/user.model.js";
import { genHash , compareHash } from "../utils/genHash.js";
import {genToken} from "../utils/genToken.js";

export const register = async (req, res) => {
    try {
        const {name , age , email , aadhaarNumber , password, userType } = req.body;
        if (!name || !age || !email || !aadhaarNumber || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await genHash(password);
        const user = new Users({
            name,
            age,
            email,
            aadhaarNumber,
            password: hashedPassword,
            ...(userType && { userType }) // Spread operator to conditionally add userType
        });

        await user.save();
        const token = await genToken({ id: user._id , email: user.email , userType: user.userType });
        return res.status(201).json({ message: "User registered successfully", User: user , Token: token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const {email , password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user=await Users.findOne({email});
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await compareHash(password,user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = await genToken({ id: user._id , email: user.email , userType: user.userType });
        return res.status(200).json({ message: "User logged in successfully", User: user , Token: token });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};