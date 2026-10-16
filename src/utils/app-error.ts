/** Error esperado de la aplicacion con un estado HTTP para errorMiddleware. */
export class AppError extends Error {
    /** Estado HTTP que se enviara al cliente. */
    public readonly statusCode: number;

    /**
     * Crea un error que puede convertirse en una respuesta HTTP.
     * @param message - Descripcion del error.
     * @param statusCode - Estado HTTP asociado, por ejemplo 404.
     */
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}
