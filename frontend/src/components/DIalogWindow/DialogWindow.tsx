import React from 'react';
import { apiURL } from '../../globalConstants.ts';
import NoPic
  from '../../assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';


interface props {
  image?: string | null;
  title: string;
  onClose: () => void;
}
const DialogWindow: React.FC<props> = ({image, title, onClose}) => {
  const imageSrc = image ? `${apiURL}/${image}` : NoPic;

  return (
    <div className="fixed inset-0 bg-gray-500/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-5 relative max-w-4xl mx-4 w-full">
        <img
          className="w-full h-auto rounded-lg object-contain"
          src={imageSrc}
          alt={title}
        />
        <div className="p-5 flex flex-col flex-grow items-center">
          <button
            onClick={onClose}
            className=" text-gray-700 hover:text-gray-900 font-semibold text-5xl"
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogWindow;