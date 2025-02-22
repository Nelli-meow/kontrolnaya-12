import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectIsCreateLoading } from '../photosSlice.ts';
import { CircularProgress } from '@mui/material';
import PhotoForm from '../../../components/PhotoForm/PhotoForm.tsx';
import { selectUser } from '../../users/UsersSlice.ts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addNewPhoto, fetchPhotosThunk } from '../photosThunk.ts';
import { IPhotoMutation } from '../../../types';


const NewPhoto = () => {
  const isCreateLoading = useAppSelector(selectIsCreateLoading);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (photo: IPhotoMutation) => {
    if (user) {
      await dispatch(addNewPhoto({photo, token: user.token}));
      await dispatch(fetchPhotosThunk());

      if (user?.role === 'user') {
        toast.success('Your photo was successfully created! ;)');
      }
      navigate('/');
    }
  };

  return (
    <div>
      {isCreateLoading ? <CircularProgress/> :
        <PhotoForm onSubmit={onSubmit}/>
      }
    </div>
  );
};

export default NewPhoto;