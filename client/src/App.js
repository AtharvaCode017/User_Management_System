// client/src/App.js

import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register'; // <--- This line is critical
import Edit from './pages/Edit';
import Details from './pages/Details';
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/view/:id' element={<Details />} />
      </Routes>
    </>
  );
}

export default App;