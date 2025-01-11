import express from "express";
import { authenticationMiddleware } from "../middleware/middleware.js";
import { createCandidate , updateCandidate , getCandidate , deleteCandidate } from "./admin.controller.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
const router = express.Router();

router.use(authenticationMiddleware , adminMiddleware);

router.post("/", createCandidate);
router.put("/", updateCandidate);
router.get("/", getCandidate);
router.delete("/", deleteCandidate);

export default router;