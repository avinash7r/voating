import bcrypt from "bcrypt";

export const genHash= async(password)=>{
    const hash=await bcrypt.hash(password,10);
    return hash;
}

export const compareHash= async(password,hash)=>{
    const isMatch=await bcrypt.compare(password,hash);
    return isMatch;
}