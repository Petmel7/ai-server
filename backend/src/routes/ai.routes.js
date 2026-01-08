import { Router } from "express";
import { summarize, classify, vision } from "../controllers/ai.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.post("/summarize", asyncHandler(summarize));
router.post("/classify", asyncHandler(classify));
router.post("/vision", upload.single("image"), asyncHandler(vision));

export default router;
