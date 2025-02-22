import { Button, Menu, MenuItem } from '@mui/material';
import { IUser } from '../../types';
import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks.ts';
import { unsetUser } from '../../features/users/UsersSlice.ts';
import { logout } from '../../features/users/usersThunk.ts';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../globalConstants.ts';
import  './userMenu.css';
import NoPic from '../../assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const imageSrc = user.image ? `${apiURL}/${user.image}` : NoPic;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(unsetUser());
    navigate('/');
  };

  const handlePhoto = () => {
    navigate('/photoCards/new');
    handleClose();
  };

  const handleUsersPhotos = () => {
    navigate(`/photos/${user._id}`);
    handleClose();
  };

  return user && (
    <>
      <Button
        onClick={handleClick}
        color="inherit">
        Hello, {user.displayName}!
        <img src={imageSrc} className="avatar ms-3" alt={user.email}/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user && user.role === 'user' && (
          <MenuItem onClick={handleUsersPhotos}>My photos</MenuItem>
        )}
        <MenuItem onClick={handlePhoto}>Add new photo</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;