import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../features/users/UsersSlice.ts';
import AnonymousMenu from '../UI/AnonymousMenu.tsx';
import UserMenu from '../UI/UserMenu.tsx';

const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <header className="bg-emerald-500 text-white mb-5">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-200 transition">
          Photo Gallery :3
        </Link>
        <div>
          {user ? <UserMenu user={user}/> : <AnonymousMenu/>}
        </div>
      </div>
    </header>
  );
};

export default Header;