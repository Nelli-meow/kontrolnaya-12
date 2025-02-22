import express from "express";
import PhotoCard from "../models/PhotoCard";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import {PhotoCardMutation} from "../types";

const PhotoCardRouter = express.Router();

PhotoCardRouter.get("/", async (req, res) => {
    try {
        const photos = await PhotoCard.find().populate("username");

        res.status(200).send(photos);
    }
    catch (error) {
        res.status(500).send({message: error});
    }
});

PhotoCardRouter.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const photo = await PhotoCard.findById(id);

        if (!photo) {
            res.status(404).send({error: 'photo not found!'});
            return;
        }

        res.status(200).send(photo);
    } catch (error) {
        res.status(500).send({message: "Something went wrong"});
    }
});

PhotoCardRouter.post("/", imagesUpload.single('image'), auth, permit('user', 'admin'), async (req, res) => {
    try {
        const expressReq = req as RequestWithUser;
        const user = expressReq.user;

        if (!user) {
            res.status(401).send({error: 'User not found!'});
            return;
        }

        const {title} = req.body;

        if (!title  ) {
            res.status(400).send('title and image is required');
            return;
        }

        if (!req.file && !req.body.image) {
            res.status(400).send({ error: 'Image is required' });
            return;
        }

        const newPhoto: PhotoCardMutation = {
            image: req.file ? 'images' + req.file.filename : null,
            title: req.body.title,
            username: user._id,
        }

        const photo = new PhotoCard(newPhoto);
        await photo.save();

        res.status(200).send(photo);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Something went wrong"});
    }
});


PhotoCardRouter.delete("/:id", auth, permit('admin'), async (req, res) => {
    try {
        const {id} = req.params;

        const photo = await PhotoCard.findById(id);
        if (!photo) {
            res.status(404).send({message: "photo not found"});
            return;
        }

        await PhotoCard.findByIdAndDelete(id);
        res.status(200).send({message: "Photo-card deleted successfully"});
    } catch (error) {
        res.status(500).send({message: "Something went wrong"});
    }
});

export default PhotoCardRouter;