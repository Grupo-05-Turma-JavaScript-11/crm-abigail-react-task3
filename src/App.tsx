
import Faq from "./pages/funcionalidades/Faq"



export default function App() {
  return (
    <BrowserRouter>
    

      <Routes>
       
        

      
        <Route path="/faq" element={<Faq />} />
      </Routes>

     
    </BrowserRouter>
  )
}
