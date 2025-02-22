import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import {  IPhotoMutation, IPhoto } from '../../types';


export const fetchPhotosThunk = createAsyncThunk(
  'photoCards/fetchPhotosThunk',
  async () => {
    const photosResponse = await axiosApi<IPhoto[]>('/photoCards');

    return photosResponse.data || [];
  }
);

export const getOneCocktail = createAsyncThunk<IPhoto, string>(
  'photoCards/getOneCocktail',
  async (id: string) => {
    const response = await axiosApi<IPhoto>(`/photoCards/${id}`);
    return response.data;
  });


export const addNewPhoto = createAsyncThunk<void, { photo: IPhotoMutation, token: string }>(
  'photoCards/addNewPhoto',
  async ({photo, token}) => {
    const formData = new FormData();

    const keys = Object.keys(photo) as (keyof IPhotoMutation)[];

    keys.forEach((key) => {
      const value = photo[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/photoCards', formData, {headers: {'Authorization': token}});
  }
);

export const deletePhoto = createAsyncThunk<void, string>(
  'cocktails/deleteCocktail',
  async (id)=> {
    await axiosApi.delete(`/cocktails/${id}`);
  }
);