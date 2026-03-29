import Intro from "./First_Page/Intro";
import { BrowserRouter } from 'react-router-dom';
import Home from "./First_Page/Home";
import Projects from "./First_Page/Components/Projects";
import About from "./First_Page/Components/About";
import Services from "./First_Page/Components/Services";
import Contact from "./First_Page/Components/Contact";
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Intro />
      <Routes>
      <Route path="/" />
      {/* <Route path="/projects" element={<Projects />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} /> */}
    </Routes>
    </BrowserRouter>
  )
}

export default App;