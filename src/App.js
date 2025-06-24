import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Contact from './pages/Contact';
import About from './pages/About';
import Navbar from './components/NavBar';
import Footers from './components/Footers';
import Register from './pages/Register';
import Store from './pages/Store';
import Painel from './pages/Painel';
import PublicLayout from './components/PublicLayout';
import Products from './pages/Products';
import Brand from './pages/Brand';
import { useEffect } from 'react';

function AppWrapper() {
  const location = useLocation();
  const isPainel = location.pathname.startsWith('/painel');

  return (
    <>
      {!isPainel && <Navbar />}
      <div className="container">
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Store" element={<Store />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Route>

          <Route path="/painel" element={<Painel />}>
            <Route path="products" element={<Products />} />
            <Route path="brand" element={<Brand />} />
          </Route>
        </Routes>
      </div>
      {!isPainel && <Footers />}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;
