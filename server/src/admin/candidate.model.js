import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    party:{
        type: String,
        unique: true,
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
        type: String,
        unique: true,
        required: true
    },
    votes:{
        type: Number,
        default: 0
    }
});

const candidates = mongoose.model("Candidate", candidateSchema);

export default candidates;