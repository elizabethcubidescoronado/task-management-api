# Task Management API

API de autenticacion y gestion de tareas con Express, TypeScript y PostgreSQL.

## Ejecutar

1. Instala las dependencias: `npm install`.
2. Configura `.env` siguiendo `.env.example` y prepara PostgreSQL con los archivos de `database/`.
3. Inicia el servidor en desarrollo: `npm run dev`.

El servidor se reinicia automaticamente cuando guardas cambios en el codigo. Para detenerlo, presiona `Ctrl+C`.

## Swagger

Abre [Swagger UI](http://localhost:3000/api-docs/) con la API en ejecucion. Si cambias `PORT`, utiliza ese puerto.

La documentacion incluye los ocho endpoints de negocio y salud, con cuerpos, ejemplos, respuestas y errores.

| Metodo | Ruta | Autenticacion |
| --- | --- | --- |
| POST | /auth/register | Publica |
| POST | /auth/login | Publica |
| GET | /health | Publica |
| GET | /tasks | JWT |
| POST | /tasks | JWT |
| GET | /tasks/{id} | JWT |
| PUT | /tasks/{id} | JWT |
| DELETE | /tasks/{id} | JWT |

Para probar las tareas desde Swagger:

1. Registra un usuario con `POST /auth/register`.
2. Inicia sesion con `POST /auth/login` y copia `token`.
3. Pulsa **Authorize**, pega solamente el token (Swagger agrega `Bearer`) y confirma.
4. Usa **Try it out** en los endpoints de tareas.

El token vence en una hora. Las operaciones por ID solo acceden a tareas del usuario autenticado. PUT requiere los cuatro campos: `title`, `description`, `due_date` y `status`. DELETE devuelve la tarea eliminada.

## Mantener la documentacion

Las anotaciones `@openapi` estan junto a las rutas en `src/api/routes/` y a `/health` en `src/app.ts`. Los esquemas compartidos y JWT se definen en `src/config/swagger.ts`; el cuerpo de tareas reutiliza el esquema de validacion de la API.

Swagger lee las anotaciones tanto del codigo TypeScript como del JavaScript compilado. Reinicia el servidor despues de cambiar la documentacion.

Comprueba TypeScript con `npx tsc --noEmit`.
