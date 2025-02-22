import Photos from '../features/photos/photos.tsx';


const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-5">
        <Photos/>
      </div>
    </div>
  );
};

export default MainPage;
