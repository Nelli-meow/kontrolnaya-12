import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "crypto";
import PhotoCard from "./models/PhotoCard";


const run = async () => {
    await mongoose.connect(config.db);

    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('photocards');
    } catch (error) {
        console.log(error);
    }

    const user = await User.create({
        email: "Jane@gmail.com",
        password: "123",
        token: randomUUID(),
        role: "user",
        displayName: "USER",
    });

    const admin = await User.create({
        email: "John@gmail.com",
        password: "666",
        token: randomUUID(),
        role: "admin",
        displayName: "ADMIN",
    });

     await PhotoCard.create([
        {
            title: "Красивая картиночка для юзера",
            username: user._id,
            image: "./fixtures/photos/_ (2).jpeg",
        },
        {
            title: "Красивая картиночка для юзера",
            username: user._id,
            image: "./fixtures/photos/_ (4).jpeg",
        },
        {
            title: "Красивая картиночка для админа",
            username: admin._id,
            image: "./fixtures/photos/_ (3).jpeg",
        },
        {
            title: "Красивая картиночка для админа",
            username: admin._id,
            image: "./fixtures/photos/Igel.jpeg",
        },
    ]);

    await db.close();
};

run().catch(console.error);