import React, { useCallback, useState } from 'react';
import { IPhotoMutation } from '../../types';
import { useNavigate } from 'react-router-dom';
import FileInput from '../FileInput/FileInput.tsx';


export interface Props {
  onSubmit: (photo: IPhotoMutation) => void;
}

const initialState = {
  title: '',
  image: null,
};

const PhotoForm: React.FC<Props> = ({onSubmit}) => {
  const [photo, setPhoto] = useState<IPhotoMutation>(initialState);
  const navigate = useNavigate();


  const onSubmitPhoto = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo.title.trim() || !photo?.image) {
      alert('Please fill in all fields: title, image');
      return;
    }

    onSubmit({...photo});
    setPhoto(initialState);
    navigate('/');
  };

  const inputChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setPhoto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setPhoto(prevState => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center mb-5">Add New Photo</h2>
      <form onSubmit={onSubmitPhoto} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
            Photo`s title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={photo.title}
            onChange={inputChangeHandler}
            required
            placeholder="Enter title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="photo" className="block text-gray-700 font-medium mb-1">
            Photo
          </label>
          <FileInput name="image" label="Image" onGetFile={getImage}/>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Add Photo
        </button>
      </form>
    </div>

  );
};

export default PhotoForm;