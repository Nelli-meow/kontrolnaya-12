import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "crypto";


const run = async () => {
    await mongoose.connect(config.db);

    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
    } catch (error) {
        console.log(error);
    }

    await User.create(
        {
            email: 'Jane@gmail.com',
            password: "123",
            token: randomUUID(),
            role: "user",
            displayName: "USER LOX",
        },
        {
            email: 'John@gmail.com',
            password: "666",
            token: randomUUID(),
            role: "admin",
            displayName: "ADMIN",
        }
    );

    await db.close();
};

run().catch(console.error);