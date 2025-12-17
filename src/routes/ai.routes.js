import { Router } from "express";
import { chat, summarize, classify } from "../controllers/ai.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post("/chat", asyncHandler(chat));
router.post("/summarize", asyncHandler(summarize));
router.post("/classify", asyncHandler(classify));

export default router;
