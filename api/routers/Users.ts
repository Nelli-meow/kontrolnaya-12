import express from 'express';
import User from '../models/User';
import {Error} from 'mongoose';
import auth, {RequestWithUser} from "../middleware/auth";
import {OAuth2Client} from "google-auth-library";
import config from "../config";
import crypto from 'crypto';
import {imagesUpload} from "../multer";


const client = new OAuth2Client(config.google.clientID);

const UsersRouter = express.Router();

UsersRouter.post("/google",  imagesUpload.single('image'), async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
                idToken: req.body.credential,
                audience: config.google.clientID,
            }
        )

        const payload = ticket.getPayload();

        if(!payload) {
            res.status(401).send({error: 'Invalid credentials. Google login failed'});
            return;
        }

        const email = payload.email;
        const id = payload.sub;
        const displayName = payload.name;
        const image = payload.picture;

        if(!email) {
            res.status(401).send({error: 'email is not found. Google login failed'});
            return;
        }

        let user = await User.findOne({ $or: [{ googleId: id }, { email: email }] });

        if(!user) {
            user = new User({
                email: email,
                password: crypto.randomUUID(),
                googleId: id,
                displayName: displayName,
                image: image,
            })
        }

        user.generateToken();
        await user.save({ validateBeforeSave: false });

        res.status(200).send({message: 'Login with Google successfully', user});
    } catch (e) {
        next(e);
    }
});

UsersRouter.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({error: 'An error occurred'});
    }
});

UsersRouter.post('/register' , imagesUpload.single('image'), async (req, res) => {

    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            image:  req.file ? 'images/' + req.file.filename : null,
        });

        user.generateToken();
        await user.save();
        res.status(200).send({user, message: 'Successfully registered'});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
    }
});

UsersRouter.post('/sessions', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });

        if (!user) {
            res.status(400).send({error: 'Email Not Found'});
            return;
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            res.status(400).send({error: 'Password is incorrect'});
            return;
        }

        user.generateToken();
        await user.save({ validateBeforeSave: false });

        res.send({message: 'Email and password are correct!', user});

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
    }
});

UsersRouter.delete('/sessions', auth, async (req, res) => {
    let reqWithAuth = req as RequestWithUser;
    const userFromAuth = reqWithAuth.user;

    try {
        const user = await User.findOne({
            _id: userFromAuth._id,
        });

        if (user) {
            user.generateToken();
            await user.save();

            res.send({message: 'Success logout'});
        }
    } catch (e) {
        res.status(400).send({error: 'An error occurred'});
    }

});

export default UsersRouter;