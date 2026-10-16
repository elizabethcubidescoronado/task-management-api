# Task Management API

API de autenticacion y gestion de tareas con Express, TypeScript y PostgreSQL.

## Ejecutar

1. Instala las dependencias: `npm install`.
2. Configura `.env` siguiendo `.env.example` y prepara PostgreSQL con los archivos de `database/`.
3. Inicia el servidor en desarrollo: `npm run dev`.

El servidor se reinicia automaticamente cuando guardas cambios en el codigo. Para detenerlo, presiona `Ctrl+C`.

## Configurar el archivo .env

Desde la raiz del proyecto, copia la plantilla en PowerShell:

```powershell
Copy-Item .env.example .env
```

Si ya tienes un archivo `.env`, edita ese archivo y conserva tus valores.

Abre `.env` y ajusta estas variables para tu instalacion local:

| Variable | Configuracion |
| --- | --- |
| `PORT` | Puerto de la API, por ejemplo `3000`. |
| `DB_HOST` | Servidor de PostgreSQL; usa `localhost` si esta en tu equipo. |
| `DB_PORT` | Puerto de PostgreSQL, normalmente `5432`. |
| `DB_USER` | Usuario de PostgreSQL con acceso a la base de datos. |
| `DB_PASSWORD` | Contrasena de ese usuario de PostgreSQL. |
| `DB_NAME` | Nombre de la base de datos que hayas creado, por ejemplo `task_management`. |
| `JWT_SECRET` | Clave secreta larga y aleatoria para firmar los tokens; reemplaza `yourjwtsecret`. |

Puedes generar una clave para `JWT_SECRET` con este comando y copiar el resultado al archivo:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

La base de datos debe existir y tener las tablas del archivo `database/database.sql`. Inicia la API con `npm run dev` y reiniciala cuando cambies `.env` para cargar los nuevos valores.

El archivo `.env` contiene secretos y esta excluido de Git mediante `.gitignore`. Comparte solamente `.env.example`, sin credenciales reales.

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
