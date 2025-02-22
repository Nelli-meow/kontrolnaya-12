import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectIsLoading, selectPhotos } from './photosSlice.ts';
import { useEffect } from 'react';
import {  deletePhoto, fetchPhotosThunk } from './photosThunk.ts';
import PreLoader from '../../components/UI/PreLoader.tsx';
import PhotosCardItem from '../../components/PhotosCardItem/PhotosCardItem.tsx';
import { selectUser } from '../users/UsersSlice.ts';

const Photos = () => {
  const photos = useAppSelector(selectPhotos);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchPhotosThunk());
  }, [dispatch]);

  console.log(photos);

  console.log(user);

  const onDelete = async (id: string) => {
    await dispatch(deletePhoto(id));
    dispatch(fetchPhotosThunk());
  };

  return (
    <>
      <h3 className="text-center text-3xl my-5">Photos</h3>

      {isLoading ? (
        <PreLoader/>
      ) : photos.length === 0 ? (
          <p className="text-center">No photos here yet :(</p>
      ) : (
          <div className="grid grid-cols-3">
            {photos.map((photo) => (
                <div key={photo._id} className="container mx-auto px-4 mb-5">
                  <PhotosCardItem username={photo.username.displayName} title={photo.title} image={photo.image} _id={photo._id} displayName={photo.username.displayName} onDelete={onDelete} />
                </div>
            ))}
          </div>
        )
      }
    </>
  );
};

export default Photos;