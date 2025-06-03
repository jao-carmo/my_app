import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Contact from './pages/Contact';
import About from './pages/About';
import Navbar from './components/Navbar'; 
import Footers from './components/Footers';
import Register from './pages/Register';
import Store from './pages/Store';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Store" element={<Store />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </div>
        <Footers />
      </BrowserRouter>
    </div>
  );
}

export default App;
