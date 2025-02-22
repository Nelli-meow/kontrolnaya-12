import './App.css';

import { Route, Routes } from 'react-router-dom';
import MainPage from './containers/MainPage.tsx';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';
import Header from './components/Header/Header.tsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import NewPhoto from './features/photos/NewPhoto/NewPhoto.tsx';
import { useAppSelector } from './app/hooks.ts';
import { selectUser } from './features/users/UsersSlice.ts';
import UsersPhotos from './containers/UsersPhotos/UsersPhotos.tsx';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/photos/:id" element={<UsersPhotos/>}/>
        <Route path="*" element={<p className="text-center">Page is not  found</p>} />
        <Route path="/photoCards/new" element={
          <ProtectedRoute isaAllowed={!!user}>
            <NewPhoto/>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
};

export default App;
