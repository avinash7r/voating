import jwt from "jsonwebtoken";

export const authenticationMiddleware = (req,res,next)=>{
    try {
        const hashToken = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(hashToken,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message:error.message});
    }
}