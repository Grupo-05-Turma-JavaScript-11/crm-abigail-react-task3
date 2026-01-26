import Faq from "./pages/funcionalidades/Faq"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home/Home";


export default function App() {
  return (
    <BrowserRouter>
    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>

     
    </BrowserRouter>
  )
}
