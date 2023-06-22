import { hash } from "bcrypt";


import connectionMongoDB from "../mongoose";
import { Connection } from "mongoose";

async function seedProduct() {
        const connection = await connectionMongoDB() as Connection;

        await connection.collection("products").insertOne({
            title: "Monito LCD 18°",
            
        });

        console.log("Created admin user successfully");

        await connection.close();
}
seedProduct();
