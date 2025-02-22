export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  image: string | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  email: string;
  token: string;
  role: string;
  image?: string | null;
  displayName: string;
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface ValidationError {
  error: {
    [key: string]: {
      message: string;
      name: string;
    },
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface IPhoto {
  title: string;
  image: string | null;
  username: string;
  _id: string;
}

export interface IPhotoMutation {
  title: string;
  image: string | null;
  username: string;
}