import mongoose from "mongoose";

const userSchema = new mongoose.SchemaTypeOptions({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    aadhaarNumber:{
        type: Number,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userType:{
        type: String,
        enum: ["voter", "admin"],
        default: "voter"
    }
});

const Users = mongoose.model("User", userSchema);

export default Users;