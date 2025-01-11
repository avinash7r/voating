import candidates from "./candidate.model.js";

export const createCandidate = async (req, res) => {
    try {
        const { name, party, age, email, aadhaarNumber } = req.body;
        if(!name || !party || !age || !email || !aadhaarNumber){
            return res.status(400).json({ message: "All fields are required" });
        }
        if(age<18){
            return res.status(400).json({ message: "Candidate age should be greater than 18" });
        }
        const existingCandidate = await candidates.findOne({ email, party , aadhaarNumber });
        if (existingCandidate) {
            return res.status(400).json({ message: "Candidate already exists" });
        }
        const candidate=new candidates({
            name,
            party,
            age,
            email,
            aadhaarNumber
        });
        await candidate.save();
        return res.status(201).json({ message: "Candidate created successfully", Candidate: candidate });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const updateCandidate = async (req, res) => {
    try {
        const { name, party, age, email, aadhaarNumber } = req.body;
        const candidate = await candidates.findOne({party});
        await candidate.save({
            name,
            party,
            age,
            email,
            aadhaarNumber
        });
        return res.status(200).json({ message: "Candidate updated successfully", Candidate: candidate });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

export const getCandidate = async (req, res) => {
    try {
        const allCandidates = await candidates.find({});
        return res.status(200).json({ message: "Candidates found", Candidates: allCandidates });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: { message: error.message, name: error.name } });
    }
}

export const deleteCandidate = async (req, res) => {
    try {
        const { party } = req.body;
        await candidates.deleteOne({ party });
        return res.status(200).json({ message: "Candidate deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}