import Users from "./user.model.js";
import candidates from "../admin/candidate.model.js";
import { genHash , compareHash } from "../utils/genHash.js";

export const getProfile= async(req,res)=>{
    try {
        const userId=req.user.id;
        const user=await Users.findById(userId);
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User found", User: user });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error from getProfile" });
    }
}

export  const updateProfile= async(req,res)=>{
    try {
        const userId=req.user.id;
        const user=await Users.findById(userId);
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        await user.save({
            name:req.body.name,
            age:req.body.age,
            email:req.body.email,
            aadhaarNumber:req.body.aadhaarNumber
        });
        return res.status(200).json({ message: "User updated successfully", User: user });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error from updateProfile" });
    }
}

export const updatePassword= async(req,res)=>{
    try {
        const userId=req.user.id;
        const user=await Users.findById(userId);
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch=await compareHash(req.body.oldPassword,user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid old password" });
        }
        const hashedPassword=await genHash(req.body.newPassword);
        user.password=hashedPassword;
        await user.save();
        return res.status(200).json({ message: "Password updated successfully", User: user });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error from updatePassword" });
    }
}

export const deleteUser= async(req,res)=>{
    try {
        const userId=req.user.id;
        const user=await Users.findById(userId);
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        const password=req.body.password;
        const isMatch=await compareHash(password,user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid password" });
        }
        await Users.deleteOne({ _id: userId });
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete user error:", error);
        return res.status(500).json({ message: "Internal server error from deleteUser", error: error.message });
    }
}

export const addVote= async(req,res)=>{
    try {
        const userId=req.user.id;
        const user=await Users.findById(userId);
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        
        const candidateId=req.body.candidateId;
        const candidate=await candidates.findById(candidateId);
        if(!candidate){
            return res.status(400).json({ message: "Candidate not found" });
        }
        
        // Check if user has already voted for this candidate
        const hasVoted = await candidates.findOne({
            _id: candidateId,
            "voters.voter": userId
        });
        if (hasVoted) {
            return res.status(400).json({ message: "You have already voted for this candidate" });
        }
        
        // Increment candidate votes and add voter
        candidate.votes++;
        candidate.voters.voter.push(userId);
        
        await candidate.save();
        
        return res.status(200).json({ 
            message: "Vote added successfully", 
            data: { 
                user: { 
                    id: user._id, 
                    name: user.name, 
                    voted: user.voted 
                },
                candidate: { 
                    id: candidate._id, 
                    name: candidate.name, 
                    votes: candidate.votes 
                }
            }
        });
    } catch (error) {
        console.error("Add vote error:", error);
        return res.status(500).json({ message: "Internal server error from addVote", error: error.message });
    }
};