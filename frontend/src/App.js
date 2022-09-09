import { Routes, Route } from 'react-router';
import NotFound from './core/NotFound';
import Login from './auth/Login';
const Home = () => <>Home</>;

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/login' element={<Login />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
