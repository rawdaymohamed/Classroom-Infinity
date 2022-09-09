import { Routes, Route } from 'react-router';
import NotFound from './core/NotFound';

const Home = () => <>Home</>;

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
