import { createSlice } from '@reduxjs/toolkit';
import {  IPhoto } from '../../types';
import { RootState } from '../../app/store.ts';
import { addNewPhoto, deletePhoto, fetchPhotosThunk, getUsersPhotos } from './photosThunk.ts';

interface IPhotosState {
  Photos: IPhoto[],
  userPhotos: IPhoto[]
  fetchPhotos: boolean,
  isLoading: boolean,
  createLoading: boolean,
  deletePhoto: boolean,
  fetchPhotosById: boolean,
}

const initialState: IPhotosState = {
  Photos: [],
  userPhotos: [],
  fetchPhotos: false,
  isLoading: false,
  createLoading: false,
  deletePhoto: false,
  fetchPhotosById: false,
};

export const selectPhotos = (state: RootState) => state.photos.Photos;
export const selectIsLoading = (state: RootState) => state.photos.isLoading;
export const selectIsCreateLoading = (state: RootState) => state.photos.createLoading;
export const selectUsersPhotos =  (state: RootState) => state.photos.userPhotos;


export const PhotosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotosThunk.pending, (state) => {
        state.fetchPhotos = true;
        state.isLoading = true;
      })
      .addCase(fetchPhotosThunk.fulfilled, (state, {payload: photos}) => {
        state.fetchPhotos = false;
        state.Photos = photos;
        state.isLoading = false;
      })
      .addCase(fetchPhotosThunk.rejected, (state) => {
        state.fetchPhotos = false;
        state.isLoading = false;
      })

      .addCase(addNewPhoto.pending, (state) => {
        state.fetchPhotos = true;
        state.createLoading = true;
      })
      .addCase(addNewPhoto.fulfilled, (state) => {
        state.fetchPhotos = false;
        state.createLoading = false;
      })
      .addCase(addNewPhoto.rejected, (state) => {
        state.fetchPhotos = false;
        state.createLoading = false;
      })

      .addCase(deletePhoto.pending, (state) => {
        state.deletePhoto = true;
      })
      .addCase(deletePhoto.fulfilled, (state) => {
        state.deletePhoto = false;
      })
      .addCase(deletePhoto.rejected, (state) => {
        state.deletePhoto = false;
      })

      .addCase(getUsersPhotos.pending, (state) => {
        state.fetchPhotosById = true;
      })
      .addCase(getUsersPhotos.fulfilled, (state, { payload: photosUsers }) => {
        state.userPhotos = photosUsers;
        state.fetchPhotosById = false;
      })
      .addCase(getUsersPhotos.rejected, (state) => {
        state.fetchPhotosById = false;
      });
  }
});

export const photosReducer = PhotosSlice.reducer;