import { apiURL } from '../../globalConstants.ts';
import NoPic
  from '../../assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
import React from 'react';
import { selectUser } from '../../features/users/UsersSlice.ts';
import { useAppSelector } from '../../app/hooks.ts';
import { Button } from '@mui/material';


interface PhotoProps {
  username: { _id: string},
  image?: string | null;
  title: string;
  _id: string;
  displayName?: string;
  onDelete: (id: string) => void;
  onOpen: (id: string, image: string, title: string) => void;
}


const PhotosCardItem: React.FC<PhotoProps> = ({ username, image, _id, title, displayName, onDelete, onOpen}) => {
  const imageSrc = image ? `${apiURL}/${image}` : NoPic;
  const user = useAppSelector(selectUser);



  return (
    <div
      className="max-w-sm bg-gradient-to-b from-sky-500 to-teal-200 border border-teal-500 rounded-lg shadow-md mb-5 h-full flex flex-col">
      <Button onClick={() => onOpen(_id, image || '', title)}>
        <img className="rounded-t-lg" src={imageSrc} alt={title}/>
      </Button>
      <div className="p-5 flex flex-col flex-grow items-baseline">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900">
          {title}
        </h5>
        <div className="mt-auto flex flex-wrap justify-between items-center gap-2">
          <a
            href={`/photos/${username._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-200 rounded-lg hover:bg-indigo-300 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-400 dark:hover:bg-indigo-300 dark:focus:ring-indigo-900 transition-all duration-300"
          >
            By: {displayName}
          </a>
        </div>
        {user && user.role === 'admin' && (
          <>
            <button onClick={() => onDelete(_id)} className=" font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 text-white bg-sky-700 hover:bg-sky-800 m-3">delete photo</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PhotosCardItem;