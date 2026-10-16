import { Router } from "express";
import { registerUser, loginUser } from "../../controllers/auth.controller";
import { validateRegister } from "../middlewares/validate-register.middleware";
import { validateLogin } from "../middlewares/validate-login.middleware";

const router = Router();
/**
 * @openapi
 * {
 *   "/auth/login": {
 *     "post": {
 *       "summary": "Iniciar sesion",
 *       "tags": [
 *         "Auth"
 *       ],
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/Credentials"
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "200": {
 *           "description": "Inicio de sesion correcto",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/LoginResponse"
 *               }
 *             }
 *           }
 *         },
 *         "400": {
 *           "description": "Datos invalidos",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/Error"
 *               }
 *             }
 *           }
 *         },
 *         "401": {
 *           "description": "Credenciales invalidas",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/Error"
 *               }
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.post("/login", validateLogin, loginUser);

/**
 * @openapi
 * {
 *   "/auth/register": {
 *     "post": {
 *       "summary": "Registrar usuario",
 *       "tags": [
 *         "Auth"
 *       ],
 *       "requestBody": {
 *         "required": true,
 *         "content": {
 *           "application/json": {
 *             "schema": {
 *               "$ref": "#/components/schemas/RegisterInput"
 *             }
 *           }
 *         }
 *       },
 *       "responses": {
 *         "201": {
 *           "description": "Usuario registrado",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/Message"
 *               }
 *             }
 *           }
 *         },
 *         "400": {
 *           "description": "Datos invalidos o correo ya registrado",
 *           "content": {
 *             "application/json": {
 *               "schema": {
 *                 "$ref": "#/components/schemas/Error"
 *               }
 *             }
 *           }
 *         }
 *       }
 *     }
 *   }
 * }
 */
router.post("/register", validateRegister, registerUser);

export default router;
