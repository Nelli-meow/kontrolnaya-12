export interface UserFields {
    password: string;
    token: string;
    role: string;
    displayName: string;
    googleId: string;
    email: string;
    image: string;
}

export interface PhotoCardMutation {
    image: string | null;
    title: string;
    username: ObjectId;
}