import { Routes, Route } from 'react-router';
import NavBar from './core/NavBar';
import NotFound from './core/NotFound';
import Login from './auth/Login';
import Signup from './user/Signup';
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import DeleteProfile from './user/DeleteUser';
const Home = () => <>Home</>;

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/signup' element={<Signup />} />
      <Route exact path='/users/:userId/profile' element={<Profile />} />
      <Route
        exact
        path='/users/:userId/profile/edit'
        element={<EditProfile />}
      />
      <Route
        exact
        path='/users/:userId/profile/delete'
        element={<DeleteProfile />}
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
