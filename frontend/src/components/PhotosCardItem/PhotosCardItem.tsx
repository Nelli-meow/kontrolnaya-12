import { apiURL } from '../../globalConstants.ts';
import NoPic
  from '../../assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
import React from 'react';


interface PhotoProps {
  username: string;
  image?: string | null;
  title: string;
  _id: string;
}


const PhotosCardItem: React.FC<PhotoProps> = ({username, image, _id, title}) => {
  const imageSrc = image ? `${apiURL}/${image}` : NoPic;

  return (
    <div
      className="max-w-sm bg-gradient-to-b from-sky-500 to-teal-200 border border-teal-500 rounded-lg shadow-md mb-5 h-full flex flex-col">
      <a href={`/photo/${_id}`}>
        <img className="rounded-t-lg" src={imageSrc} alt={title}/>
      </a>
      <div className="p-5 flex flex-col flex-grow">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900">
          {title}
        </h5>
        <div className="mt-auto flex flex-wrap justify-between items-center gap-2">
          <a
            href={`/photos/${username}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-200 rounded-lg hover:bg-indigo-300 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-400 dark:hover:bg-indigo-300 dark:focus:ring-indigo-900 transition-all duration-300"
          >
            By: {username}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PhotosCardItem;