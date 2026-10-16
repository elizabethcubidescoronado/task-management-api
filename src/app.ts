import express from "express";
import authRoutes from "./api/routes/auth.routes";
import taskRoutes from "./api/routes/task.routes";
import { errorMiddleware } from "./api/middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Consultar estado del servicio
 *     tags: [Health]
 *     responses:
 *       '200':
 *         description: Servicio disponible
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [status]
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [ok]
 */
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorMiddleware);

export default app;
