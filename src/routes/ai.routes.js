import { Router } from "express";
import { chat, summarize } from "../controllers/ai.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post("/chat", asyncHandler(chat));
router.post("/summarize", asyncHandler(summarize));

export default router;
