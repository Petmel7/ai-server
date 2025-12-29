import express from "express";
import cors from "cors";

import aiRoutes from "./routes/ai.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/ai", aiRoutes);
app.use(errorMiddleware);

export default app;
