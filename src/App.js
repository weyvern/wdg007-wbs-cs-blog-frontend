import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar';
import GlobalLayout from './components/GlobalLayout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import SinglePost from './components/SinglePost';
import CreatePost from './components/CreatePost';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from './utils/authUtils';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const { data, error } = await getUser(token);
        if (error) throw error;
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('token');
        setToken(null);
        toast.error(error.message);
      }
    };
    token && validateToken();
  }, [token]);

  const logOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <>
      <ToastContainer />
      <NavBar isAuthenticated={isAuthenticated} logOut={logOut} user={user} />
      <Routes>
        <Route path='/' element={<GlobalLayout />}>
          <Route index element={<Home />} />
          <Route
            path='login'
            element={
              <Login
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setToken={setToken}
              />
            }
          />
          <Route
            path='register'
            element={
              <Register
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setToken={setToken}
              />
            }
          />
          <Route path='posts/:id' element={<SinglePost />} />
          <Route path='create' element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
