import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Facebook from './Components/Faceb/Fb'
import Laoder from "./Components/Laoder";

const App = () => {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Facebook/>}/>
      <Route path="/Profile" element={<Laoder/>}/>
    </Routes>
   </Router>
  )
}

export default App