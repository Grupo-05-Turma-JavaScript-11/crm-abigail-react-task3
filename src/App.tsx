
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Sobre from './pages/sobre/Sobre';
import Feature from './pages/funcionalidades/Feature';



export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>

        <Route path="/" element={<Feature />} />

      </Routes>

    </BrowserRouter>
  )

}