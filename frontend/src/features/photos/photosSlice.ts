import { createSlice } from '@reduxjs/toolkit';
import {  IPhoto } from '../../types';
import { RootState } from '../../app/store.ts';
import { addNewPhoto, deletePhoto, fetchPhotosThunk } from './photosThunk.ts';

interface IPhotosState {
  Photos: IPhoto[],
  fetchPhotos: boolean,
  isLoading: boolean,
  createLoading: boolean,
  deletePhoto: boolean,
}

const initialState: IPhotosState = {
  Photos: [],
  fetchPhotos: false,
  isLoading: false,
  createLoading: false,
  deletePhoto: false,
};

export const selectPhotos = (state: RootState) => state.photos.Photos;
export const selectIsLoading = (state: RootState) => state.photos.isLoading;
export const selectIsCreateLoading = (state: RootState) => state.photos.createLoading;


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
      });
  }
});

export const photosReducer = PhotosSlice.reducer;