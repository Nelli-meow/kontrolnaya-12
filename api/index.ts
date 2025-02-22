import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import cors from 'cors';
import UsersRouter from "./routers/Users";
import PhotoCardRouter from "./routers/PhotoCard";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/users', UsersRouter);
app.use('/photoCards', PhotoCardRouter);

app.use(express.static('public'));

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

run().catch((err) => console.log(err));
