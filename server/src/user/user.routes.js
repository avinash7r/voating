import express from "express";
import { authenticationMiddleware } from "../middleware/middleware.js";
import { getProfile , updateProfile , updatePassword , deleteUser , addVote} from "./user.controller.js";
const router = express.Router();

router.get("/user",authenticationMiddleware, getProfile);
router.put("/user",authenticationMiddleware, updateProfile);
router.patch("/user",authenticationMiddleware, updatePassword);
router.delete("/user",authenticationMiddleware, deleteUser);
router.put("/user/vote",authenticationMiddleware,addVote);
export default router;