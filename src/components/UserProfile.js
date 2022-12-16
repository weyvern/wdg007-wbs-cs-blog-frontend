import { Link } from 'react-router-dom';
import Loading from './Loading';

const UserProfile = ({ user }) => {
  return user ? (
    <div>
      <h1>
        Welcome back, {user.firstName} {user.lastName}
      </h1>
      <p>
        Want to create a new post? 👉 <Link to='/auth/create'>Create new post</Link>
      </p>
      <p>
        Our maybe check what's new 👉 <Link to='/'>All posts</Link>
      </p>
    </div>
  ) : (
    <Loading />
  );
};
export default UserProfile;
