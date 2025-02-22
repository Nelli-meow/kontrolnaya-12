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

  const onDelete = async (id: string) => {
    await dispatch(deletePhoto(id));
    dispatch(fetchPhotosThunk());
  };

  return (
    <div>
      <h3 className="text-center text-3xl my-5">Photos</h3>

      {isLoading ? (
        <PreLoader/>
      ) : photos.length === 0 ? (
          <p className="text-center">No photos here yet :(</p>
      ) : (
          <>
            {photos.map((photo) => (
              <div key={photo._id}>
                <div className="container mx-auto px-4">
                  <PhotosCardItem username={photo.username} title={photo.title} image={photo.image} _id={photo._id}/>
                  {user && user.role === 'admin' && (
                    <>
                      <button onClick={() => onDelete(photo._id)} className=" font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 text-white bg-red-700 hover:bg-red-800">delete photo</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </>
        )
      }
    </div>
  );
};

export default Photos;