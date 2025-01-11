import jwt from "jsonwebtoken";

export const genToken=async(payload)=>{
    try {
        const token=await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"});
        return token;
    } catch (error) {
        return res.status(401).json({message:error.message});
    }
}