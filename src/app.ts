import express from "express";
import authRoutes from "./api/routes/auth.routes";
import taskRoutes from "./api/routes/task.routes";
import { errorMiddleware } from "./api/middlewares/error.middleware";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.get("/health", (_req, res) => {
res.json({ status: "ok" });
                                                                                                                                                                                                                                                                                                              
});
app.use(errorMiddleware);
export default app;
