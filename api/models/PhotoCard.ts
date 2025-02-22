import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PhotoCardSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    username: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }
});

const PhotoCard = mongoose.model('PhotoCard', PhotoCardSchema);
export default PhotoCard;