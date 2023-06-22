import "dotenv/config";

import mongoose, { Connection } from "mongoose";

export default async function connectionMongoDB(): Promise<Connection | undefined> {
        const url = String(process.env.MONGODB_URL_CLASSROOM);

        await mongoose.connect(url);

        const { connection } = mongoose;

        connection.on("open", () => {
            console.log("Conectado ao MongoDB com sucesso! DB_CLASSROOM");
        });

        return connection;
}

connectionMongoDB();