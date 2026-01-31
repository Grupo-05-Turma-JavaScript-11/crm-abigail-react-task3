
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Sobre from './pages/sobre/Sobre';
import Feature from './pages/funcionalidades/Feature';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Dashboard from './pages/dashboard/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/funcionalidades" element={<Feature />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  )

}