
import { BrowserRouter, Route, Routes } from "react-router-dom"
import FeaturesSection from "./pages/funcionalidades/FeatureSection"


export default function App() {
  return (
    <BrowserRouter>
    

      <Routes>
      
        <Route path="/" element={<FeaturesSection />} />
      </Routes>

     
    </BrowserRouter>
  )
}
