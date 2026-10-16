import path from "node:path";
import swaggerJSDoc from "swagger-jsdoc";
import taskSchema from "../schemas/task.schema";

const swaggerSpec = swaggerJSDoc({
    failOnErrors: true,
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API",
            version: "1.0.0",
            description: "API de tareas. Registrate, inicia sesion y usa el token en Authorize para acceder a tus tareas."
        },
        components: {
            securitySchemes: {
                bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
            },
            schemas: {
                ...{
    "Error": {
        "type": "object",
        "properties": {
            "error": {
                "type": "string"
            }
        },
        "required": [
            "error"
        ]
    },
    "ServerError": {
        "type": "object",
        "properties": {
            "message": {
                "type": "string"
            },
            "stack": {
                "type": "string",
                "nullable": true
            }
        },
        "required": [
            "message"
        ]
    },
    "TaskValidationError": {
        "type": "object",
        "properties": {
            "message": {
                "type": "string",
                "example": "Invalid task data"
            },
            "errors": {
                "type": "array",
                "items": {
                    "type": "object",
                    "additionalProperties": true
                }
            }
        }
    },
    "Credentials": {
        "type": "object",
        "required": [
            "email",
            "password"
        ],
        "properties": {
            "email": {
                "type": "string",
                "format": "email",
                "example": "ana@example.com"
            },
            "password": {
                "type": "string",
                "minLength": 8,
                "example": "Password123!"
            }
        }
    },
    "RegisterInput": {
        "allOf": [
            {
                "$ref": "#/components/schemas/Credentials"
            },
            {
                "type": "object",
                "required": [
                    "name"
                ],
                "properties": {
                    "name": {
                        "type": "string",
                        "example": "Ana"
                    }
                }
            }
        ]
    },
    "Message": {
        "type": "object",
        "required": [
            "message"
        ],
        "properties": {
            "message": {
                "type": "string"
            }
        }
    },
    "LoginResponse": {
        "type": "object",
        "required": [
            "message",
            "token"
        ],
        "properties": {
            "message": {
                "type": "string",
                "example": "Login successful"
            },
            "token": {
                "type": "string",
                "description": "JWT con vigencia de una hora."
            }
        }
    },
    "Task": {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer",
                "example": 1
            },
            "title": {
                "type": "string",
                "example": "Documentar API"
            },
            "description": {
                "type": "string",
                "example": "Completar Swagger"
            },
            "due_date": {
                "type": "string",
                "format": "date",
                "example": "2026-10-20"
            },
            "status": {
                "type": "string",
                "enum": [
                    "pendiente",
                    "en curso",
                    "completada"
                ]
            },
            "user_id": {
                "type": "integer",
                "example": 1
            }
        },
        "additionalProperties": true
    }
},
                TaskInput: taskSchema
            }
        }
    },
    // Absolute paths support execution from a different working directory.
    // TypeScript retains documentation comments in the compiled JavaScript.
    apis: [
        path.resolve(__dirname, "../api/routes/*.{ts,js}").replace(/\\/g, "/"),
        path.resolve(__dirname, "../app.{ts,js}").replace(/\\/g, "/")
    ]
});

export default swaggerSpec;
