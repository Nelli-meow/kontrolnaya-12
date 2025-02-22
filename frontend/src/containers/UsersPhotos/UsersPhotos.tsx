import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deletePhoto, fetchPhotosThunk, getUsersPhotos } from '../../features/photos/photosThunk.ts';
import { selectUser } from '../../features/users/UsersSlice.ts';
import { selectIsLoading, selectUsersPhotos } from '../../features/photos/photosSlice.ts';
import PhotosCardItem from '../../components/PhotosCardItem/PhotosCardItem.tsx';
import DialogWindow from '../../components/DIalogWindow/DialogWindow.tsx';
import PreLoader from '../../components/UI/PreLoader.tsx';


const UsersPhotos = () => {
  const {id} = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const userPhotos = useAppSelector(selectUsersPhotos);
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);

  const [selectedPhoto, setSelectedPhoto] = useState<{ image: string, title: string } | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(getUsersPhotos(id));
    }
  }, [dispatch, id]);

  console.log(userPhotos);

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


  return  (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-5">
      {isLoading ? (
        <PreLoader/>
      ) : userPhotos.length === 0 ? (
        <p className="text-center">No photos here yet :(</p>
      ) : (
        <>
        {user?.displayName === userPhotos[0]?.username.displayName && (
          <h3 className="text-center text-3xl my-5">{user.displayName} gallery</h3>
        )}
          <div className="grid grid-cols-3">
            {userPhotos.map((photo) => (
              <div key={photo._id} className="container mx-auto px-4 mb-5">
                <PhotosCardItem
                  _id={photo._id}
                  image={photo.image}
                  onDelete={onDelete}
                  title={photo.title}
                  username={photo.username}
                  displayName={photo.username.displayName}
                  onOpen={onOpenWindow}
                />
              </div>

                ))}
              </div>
              </>
              )}

            {selectedPhoto && (
              <DialogWindow
            image={selectedPhoto.image}
            title={selectedPhoto.title}
            onClose={onCloseWindow}
          />
        )}
        </div>
      );
      };

      export default UsersPhotos;