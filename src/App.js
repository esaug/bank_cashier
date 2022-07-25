
import './App.css';
import Home from './pages/Home';
import Profile from './components/Profile';
import { Route, Routes } from 'react-router-dom';
import ProfileUser from './pages/ProfileUser';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<ProfileUser/>}/>
      </Routes>
    </>
  );
}

export default App;
  