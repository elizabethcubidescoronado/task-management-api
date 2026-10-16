import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getTasks, createTask, getTaskById, updateTask, deleteTask } from "../../controllers/task.controller";
import { validateTask } from "../middlewares/validate-task.middleware";

const router = Router();
/**
 * @openapi
 * {
 *   "/tasks": {
 *     "get": {
 *       "summary": "Listar mis tareas",
 *       "tags": [
 *         "Tasks"
 *       ],
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Tareas del usuario autenticado",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "type": "array",
 *                 "items": {
 *                   "$ref": "#/components/schemas/Task"
 *                 }
 *               }
 *             }
 *           }
 *         },
 *         "401": {
 *           "description": "Token ausente, invalido o expirado",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/Error"
 *               }
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Error interno",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/ServerError"
 *               }
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.get("/", authMiddleware, getTasks);

/**
 * @openapi
 * {
 *   "/tasks": {
 *     "post": {
 *       "summary": "Crear tarea",
 *       "tags": [
 *         "Tasks"
 *       ],
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "responses": {
 *         "201": {
 *           "description": "Tarea creada",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/Task"
 *               }
 *             }
 *           }
 *         },
 *         "400": {
 *           "description": "Datos de tarea invalidos",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/TaskValidationError"
 *               }
 *             }
 *           }
 *         },
 *         "401": {
 *           "description": "Token ausente, invalido o expirado",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/Error"
 *               }
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Error interno",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/ServerError"
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/TaskInput"
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.post("/", authMiddleware, validateTask, createTask);

/**
 * @openapi
 * {
 *   "/tasks/{id}": {
 *     "get": {
 *       "summary": "Consultar tarea",
 *       "tags": [
 *         "Tasks"
 *       ],
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Tarea encontrada",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/Task"
 *               }
 *             }
 *           }
 *         },
 *         "401": {
 *           "description": "Token ausente, invalido o expirado",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/Error"
 *               }
 *             }
 *           }
 *         },
 *         "404": {
 *           "description": "La tarea no existe o pertenece a otro usuario",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/ServerError"
 *               }
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Error interno",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/ServerError"
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "required": true,
 *           "description": "Identificador de la tarea del usuario autenticado",
 *           "schema": {
 *             "type": "integer"
 *           },
 *           "example": 1
 *         }
 *       ]
 *     }
 *   }
 * }
 */
router.get("/:id", authMiddleware, getTaskById);

/**
 * @openapi
 * {
 *   "/tasks/{id}": {
 *     "put": {
 *       "summary": "Actualizar tarea",
 *       "tags": [
 *         "Tasks"
 *       ],
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Tarea actualizada",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/Task"
 *               }
 *             }
 *           }
 *         },
 *         "400": {
 *           "description": "Datos de tarea invalidos",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/TaskValidationError"
 *               }
 *             }
 *           }
 *         },
 *         "401": {
 *           "description": "Token ausente, invalido o expirado",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/Error"
 *               }
 *             }
 *           }
 *         },
 *         "404": {
 *           "description": "La tarea no existe o pertenece a otro usuario",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/ServerError"
 *               }
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Error interno",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/ServerError"
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "required": true,
 *           "description": "Identificador de la tarea del usuario autenticado",
 *           "schema": {
 *             "type": "integer"
 *           },
 *           "example": 1
 *         }
 *       ],
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/TaskInput"
 *             }
 *           }
 *         }
 *       },
 *       "description": "Reemplaza los campos editables. Todos los campos del cuerpo son obligatorios."
 *     }
 *   }
 * }
 */
router.put("/:id", authMiddleware, validateTask, updateTask);

/**
 * @openapi
 * {
 *   "/tasks/{id}": {
 *     "delete": {
 *       "summary": "Eliminar tarea",
 *       "tags": [
 *         "Tasks"
 *       ],
 *       "security": [
 *         {
 *           "bearerAuth": []
 *         }
 *       ],
 *       "responses": {
 *         "200": {
 *           "description": "Tarea eliminada (se devuelve el objeto eliminado)",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/Task"
 *               }
 *             }
 *           }
 *         },
 *         "401": {
 *           "description": "Token ausente, invalido o expirado",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/Error"
 *               }
 *             }
 *           }
 *         },
 *         "404": {
 *           "description": "La tarea no existe o pertenece a otro usuario",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/ServerError"
 *               }
 *             }
 *           }
 *         },
 *         "500": {
 *           "description": "Error interno",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/ServerError"
 *               }
 *             }
 *           }
 *         }
 *       },
 *       "parameters": [
 *         {
 *           "name": "id",
 *           "in": "path",
 *           "required": true,
 *           "description": "Identificador de la tarea del usuario autenticado",
 *           "schema": {
 *             "type": "integer"
 *           },
 *           "example": 1
 *         }
 *       ]
 *     }
 *   }
 * }
 */
router.delete("/:id", authMiddleware, deleteTask);

export default router;
