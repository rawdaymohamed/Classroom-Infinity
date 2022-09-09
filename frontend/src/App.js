import { Routes, Route } from 'react-router';
import './App.css';

const Home = () => <>Home</>;

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
    </Routes>
  );
}

export default App;
