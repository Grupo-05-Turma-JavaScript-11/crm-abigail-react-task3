import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import Sobre from "./pages/sobre/Sobre";
import Feature from "./pages/funcionalidades/Feature";

import NovoPaciente from "./components/pacientes/NovoPaciente";
import ListaPacientes from "./components/pacientes/ListaPacientes";
import EditarPaciente from "./components/pacientes/EditarPaciente";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/funcionalidades" element={<Feature />} />

        <Route path="/novo-paciente" element={<NovoPaciente />} />
        <Route path="/pacientes" element={<ListaPacientes />} />
        <Route path="/pacientes/:id/editar" element={<EditarPaciente />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
