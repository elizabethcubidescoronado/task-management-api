# Bitácora de desarrollo

## Alcance y fuentes

Esta bitácora registra el trabajo verificable en el historial de Git y en la sesión de asistencia con IA del 16 de octubre de 2026, además de la experiencia de desarrollo aportada por la persona desarrolladora mediante una captura. Las pruebas relatadas en esa captura se distinguen de las ejecutadas por Codex. No reconstruye decisiones ni tiempos de trabajo anteriores que no estén documentados.

El proyecto es una API de autenticación y gestión de tareas con Express, TypeScript y PostgreSQL. El código se organiza en rutas, middlewares, controladores, servicios y repositorios. La autenticación utiliza JWT, las contraseñas se protegen con bcrypt y los cuerpos de las tareas se validan con AJV.

## Registro de actividades — 16 de octubre de 2026

| Etapa | Actividad y resultado | Evidencia |
| --- | --- | --- |
| Base del proyecto | El historial contiene un commit inicial y otro con el esquema de PostgreSQL. El código de autenticación y tareas ya existía al comenzar la asistencia registrada. | `eb56e8f`, `9757bd9` |
| Swagger | Se corrigió un error de sintaxis en la configuración y se documentaron las ocho operaciones de autenticación, tareas y salud. Se añadieron cuerpos, parámetros, respuestas, errores y seguridad Bearer JWT. El cuerpo de tareas reutiliza el esquema de validación existente. | `1b27ea1` |
| JSDoc | Se documentaron las funciones de controladores, servicios, repositorios y middlewares, además de la clase `AppError`, con parámetros, retornos y errores esperados cuando corresponde. | `352b4ec` |
| TypeScript | Se eliminaron las conversiones explícitas de `req` a `any` para acceder a la identidad. Se agregó `AuthenticatedUser`, se extendió el tipo de petición de Express y se verificó la estructura del payload JWT antes de asignarla. También se mejoró la legibilidad del middleware de errores y se reemplazó un `var` por `const`. | `2a3e180` |
| Ejecución local | Se agregó el script `dev` con `tsx watch src/server.ts` y se actualizó el README para ejecutar `npm run dev`. | `a25170a` |
| Variables de entorno | Se documentaron la copia de `.env.example`, las variables de PostgreSQL, el puerto y la generación de `JWT_SECRET`. Se comprobó que `.env` figura en `.gitignore`. | `ec940bd` |

Los commits nuevos se separaron por propósito y utilizaron Conventional Commits. Los dos commits anteriores a esta asistencia conservan sus mensajes originales.

## Uso de herramientas de inteligencia artificial

### Herramienta y alcance

La persona desarrolladora explica que utilizó ChatGPT principalmente como guía durante el desarrollo inicial: recibió instrucciones y orientación para pensar y escribir el código por su cuenta. La captura aportada describe una consulta puntual sobre la sintaxis de `instanceof`, después de identificar que `Error` no exponía `statusCode`. Por ello, el uso de ChatGPT se documenta como acompañamiento conceptual con asistencia puntual de sintaxis, en lugar de afirmar que nunca hubo ayuda con código.

Ese acompañamiento se distingue del uso posterior de Codex, que sí generó documentación y modificó archivos del proyecto, como se detalla a continuación.

Se utilizó Codex como asistente de programación en una conversación vinculada al proyecto local. La IA leyó archivos, revisó diferencias e historial de Git, redactó documentación, modificó código y ejecutó verificaciones. También creó commits y realizó los pushes solicitados por la persona desarrolladora.

La participación registrada de la IA corresponde a las mejoras posteriores al código inicial. Esta bitácora no atribuye a la IA la creación original de la API ni afirma cómo se desarrolló ese código.

### Solicitudes y aportes

Las siguientes solicitudes están resumidas a partir de la conversación; no son transcripciones literales completas.

| Solicitud de la persona desarrolladora | Aporte de la IA |
| --- | --- |
| Documentar todos los endpoints con Swagger dentro del proyecto. | Revisó rutas, validadores, servicios y respuestas reales; corrigió la configuración y completó las anotaciones OpenAPI. |
| Completar JSDoc y utilizar commits atómicos y descriptivos. | Añadió documentación a las funciones y clases principales y organizó los cambios en commits separados. |
| Mejorar las prácticas de TypeScript. | Tipó la identidad autenticada y agregó comprobaciones del payload JWT para evitar asignaciones mediante `any`. |
| Ejecutar el proyecto con `npm run dev`. | Agregó el script de desarrollo con reinicio automático y sus instrucciones. |
| Explicar la configuración de `.env`. | Añadió instrucciones, una tabla de variables y un comando para generar la clave JWT sin publicar secretos. |
| Subir los cambios a GitHub. | Creó los commits correspondientes y ejecutó los pushes autorizados a `main`. |
| Crear una bitácora con una sección sobre IA. | Preparó este archivo a partir de la conversación y del historial verificable. |

### Casos concretos de asistencia

#### ChatGPT: distinguir Error de AppError en el middleware

- **Prompt mostrado en la captura:** «No puedo manejar Error ya que no tiene el status code.» La captura recoge esta formulación; no se dispone del historial original para comprobar si incluía texto adicional.
- **Uso de la IA:** comprender la diferencia entre el error estándar de JavaScript y la clase personalizada `AppError`, que incorpora `statusCode`. La captura también describe una solicitud puntual de la sintaxis de `instanceof`; falta el texto exacto de esa segunda solicitud.
- **Qué se aceptó y por qué:** comprobar `err instanceof AppError` antes de acceder a `err.statusCode`. La condición permite que TypeScript reconozca la clase y que el middleware responda con el estado específico para errores de aplicación o con 500 para errores generales.
- **Qué se rechazó o modificó:** se descartó el intento inicial de tipar el parámetro únicamente como `AppError`, porque el middleware también debe recibir errores normales. Se conservó `err: Error` y se comprobó su clase dentro de la función. Esta era una alternativa de implementación inicial; no se afirma que fuera una propuesta de la IA.
- **Verificación realizada por la desarrolladora, según la captura:** se probó `GET /tasks/999` en Postman. Inicialmente devolvía 500 y, tras la corrección, devolvió `404 Not Found`. Para reproducir el caso hay que enviar un JWT válido y usar el ID de una tarea que no exista o no pertenezca al usuario.
- **Evidencia disponible:** el middleware actual contiene la comprobación `err instanceof AppError`. La prueba de Postman es un resultado relatado en la captura, no una prueba ejecutada por Codex ni un test automatizado guardado en el repositorio.

#### Swagger con Codex

- **Prompt utilizado (literal):** «ayudame a hacer esto• Swagger — Documentar todos los endpoints directamente en el proyecto.»
- **Qué se incorporó y fundamento técnico:** configuración OpenAPI y documentación de las ocho operaciones. Los contratos se redactaron a partir de las rutas, respuestas y validadores existentes; reutilizar el esquema de tareas evita mantener dos definiciones distintas del cuerpo requerido.
- **Qué se modificó:** se corrigió la configuración incompleta, que tenía un error de sintaxis, y se completaron las rutas que no estaban documentadas. No consta un rechazo personal de una propuesta generada.
- **Verificación realizada:** Codex comprobó la generación de ocho operaciones, las referencias de esquemas, la seguridad JWT de las tareas y la compilación de TypeScript.

#### Comando de desarrollo con Codex

- **Prompt utilizado (literal):** «pero se puede dejar Comandos para ejecutar el proyecto (npm run dev).»
- **Qué se incorporó y fundamento técnico:** el script `dev` utiliza `tsx watch src/server.ts`, aprovechando una dependencia que ya existía y facilitando el reinicio durante el desarrollo.
- **Qué se modificó:** el README pasó de indicar `npx tsx src/server.ts` a `npm run dev`. No consta que se rechazara una alternativa de código.
- **Verificación realizada:** Codex comprobó que `npm.cmd run` mostrara el script y que TypeScript compilara. Esto no verifica una conexión real a PostgreSQL.

### Decisiones sin asistencia de IA

Pendiente de completar con al menos dos decisiones reales de la persona desarrolladora. Para cada una se debe indicar qué decidió, qué alternativas consideró y por qué eligió esa opción. La estructura por capas y el uso de JWT están presentes en el código, pero su presencia no demuestra que fueran decisiones tomadas sin asistencia.

### Comprobaciones ejecutadas

Las verificaciones siguientes fueron ejecutadas por el propio asistente. No equivalen a una revisión humana independiente.

- TypeScript: `npx.cmd tsc --noEmit` terminó correctamente después de las modificaciones de tipado y del script de desarrollo.
- Swagger: una comprobación local confirmó las ocho operaciones, la seguridad JWT en tareas y las referencias internas de los esquemas. Otra comprobación posterior confirmó que las ocho operaciones seguían presentes.
- Autenticación: una comprobación local aceptó un JWT con identidad válida, rechazó payloads con ID de tipo incorrecto o sin correo y verificó que el acceso a una identidad ausente produce un error 401.
- Scripts: `npm.cmd run` mostró el comando `dev` configurado con `tsx watch src/server.ts`.
- Cambios: se ejecutó `git diff --check` y se revisó el estado de Git. Los pushes de los cambios previos a esta bitácora terminaron correctamente.

### Limitaciones y pendientes

- `npm test` todavía contiene el script inicial que termina con error; no hay una suite automatizada de pruebas establecida.
- Las comprobaciones de autenticación y Swagger se ejecutaron como scripts locales puntuales; no quedaron guardadas como tests en el repositorio.
- No se verificó en esta sesión el flujo completo de registro, inicio de sesión y CRUD contra una instancia real de PostgreSQL, ni el arranque de `npm run dev` conectado a ella.
- La compilación y las comprobaciones puntuales no garantizan por sí solas la ausencia de errores funcionales.
- La persona desarrolladora debe revisar los cambios y comprender su funcionamiento antes de entregar el proyecto. La prueba personal registrada corresponde al caso de `AppError`; no demuestra una revisión humana de todos los cambios posteriores de Codex.
- Para completar los requisitos de la guía faltan confirmar el prompt original completo del caso de `AppError`, recuperar la solicitud exacta de sintaxis mencionada en la captura y documentar al menos dos decisiones tomadas sin asistencia de IA.

## Retos y soluciones

El primer caso corresponde a la experiencia personal descrita en la captura aportada. Los restantes corresponden al trabajo observado durante la asistencia de Codex.

| Reto observado | Solución aplicada | Comprobación y alcance |
| --- | --- | --- |
| Un error de tarea no encontrada devolvía 500; `Error` no contiene `statusCode`. | Se mantuvo el parámetro como `Error` y se utilizó `instanceof AppError` para acceder al estado personalizado, conservando 500 para otros errores. | Según el relato aportado, `GET /tasks/999` pasó de 500 a 404 en Postman. Codex no repitió esa prueba contra PostgreSQL. |
| La configuración de Swagger tenía un error de sintaxis y faltaba documentar tareas y salud. | Se corrigió la configuración y se añadieron los contratos de las operaciones faltantes. | TypeScript compiló y la especificación generó las ocho operaciones. |
| El acceso a la identidad mediante `(req as any).user` evitaba las comprobaciones de tipos. | Se definió `AuthenticatedUser`, se extendió la petición de Express y se comprobó la estructura del payload JWT. | Compilación y comprobaciones locales de identidad válida e identidades incorrectas; no se probó todo el flujo contra PostgreSQL. |
| La ejecución de `npx` desde PowerShell quedó bloqueada por la política de scripts. | Se utilizó `npx.cmd tsc --noEmit`, sin cambiar la política de seguridad del equipo. | El comando terminó correctamente. |
| El README no explicaba cómo configurar las variables de entorno y faltaba el script `dev`. | Se documentaron las variables, la copia de la plantilla y la generación de la clave JWT; se agregó el script de desarrollo. | Se comprobó la presencia del script y la exclusión de `.env` en `.gitignore`; queda pendiente verificar el arranque contra una base local. |

## Continuidad

Para cada nueva actividad, registrar la fecha, el objetivo, los archivos o commits relacionados, el uso de IA si lo hubo, las comprobaciones realizadas y los problemas pendientes. Evitar registrar credenciales o el contenido real de `.env`.
