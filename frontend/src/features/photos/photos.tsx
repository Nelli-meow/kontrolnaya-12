import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectIsLoading, selectPhotos } from './photosSlice.ts';
import { useEffect, useState } from 'react';
import { deletePhoto, fetchPhotosThunk } from './photosThunk.ts';
import PreLoader from '../../components/UI/PreLoader.tsx';
import PhotosCardItem from '../../components/PhotosCardItem/PhotosCardItem.tsx';
import DialogWindow from '../../components/DIalogWindow/DialogWindow.tsx';

const Photos = () => {
  const photos = useAppSelector(selectPhotos);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const [selectedPhoto, setSelectedPhoto] = useState<{ image: string, title: string } | null>(null);

  useEffect(() => {
    dispatch(fetchPhotosThunk());
  }, [dispatch]);

  const onDelete = async (id: string) => {
    await dispatch(deletePhoto(id));
    dispatch(fetchPhotosThunk());
  };

  const onCloseWindow = () => {
    setSelectedPhoto(null);
  };

  const onOpenWindow = (_id: string, image: string, title: string) => {
    setSelectedPhoto({image, title});
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
              <PhotosCardItem username={photo.username} title={photo.title} image={photo.image} _id={photo._id}
                              displayName={photo.username ? photo.username.displayName : 'Unknown User'}
                              onDelete={onDelete} onOpen={onOpenWindow}/>
            </div>
          ))}
        </div>
      )
      }

      {selectedPhoto && (
        <DialogWindow
          image={selectedPhoto.image}
          title={selectedPhoto.title}
          onClose={onCloseWindow}
        />
      )}
    </>
  );
};

export default Photos;