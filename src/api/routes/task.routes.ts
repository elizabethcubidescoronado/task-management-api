import { Router } from "express";
import {authMiddleware} from "../middlewares/auth.middleware";
import { getTasks } from "../../controllers/task.controller";
import { createTask } from "../../controllers/task.controller";
import { getTaskById } from "../../controllers/task.controller";
import { updateTask } from "../../controllers/task.controller";
import { deleteTask } from "../../controllers/task.controller";
import { validateTask } from "../middlewares/validate-task.middleware";

const router = Router();
router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, validateTask, createTask);
router.get("/:id", authMiddleware, getTaskById);
router.put("/:id", authMiddleware, validateTask, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;