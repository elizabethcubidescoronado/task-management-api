import app from "./app";
import { config } from "./config/env";
import pool from "./persistence/database";

const startServer = async () => {
    try {
        await pool.query("SELECT 1");
        console.log("Connected to the database successfully.");
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }


};
startServer();


