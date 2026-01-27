
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Sobre from "./pages/sobre/Sobre"



export default function App() {
  return (
    <BrowserRouter>

    

      <Routes>
       

      <Route path="/" element={<Sobre/>}/>
       
       
      </Routes>

     
    </BrowserRouter>
  )

}