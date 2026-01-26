import Faq from "./pages/funcionalidades/Faq"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";


export default function App() {
  return (
    <BrowserRouter>
    
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
    </BrowserRouter>
  )
}
