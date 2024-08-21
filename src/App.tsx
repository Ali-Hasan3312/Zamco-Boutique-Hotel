import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import React, { lazy, Suspense } from 'react'
import './App.css';
import Home from './pages/Home';
import Footer from './components/Footer';
const Navbar = lazy(()=> import("./components/navbar"))
const InfoGrid = lazy(()=> import('./pages/InfoGrid'))
const Gallery = lazy(()=> import('./pages/Gallery'))
const Services = lazy(()=> import('./pages/Services'))
const ImgSlider = lazy(()=> import('./components/Slider'))
const OurRooms = lazy(()=> import('./pages/OurRooms'))
const Loader = lazy(() => import("./components/Loader"));
const SignUp = lazy(() => import("./components/SignUp"));
const Contact = lazy(() => import("./components/ContactUs"));

function App() {
  function ScrollToTop() {
    const { hash } = useLocation();
  
    React.useEffect(() => {
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [hash]);
  
    return null;
  }

  return (
    <Router>
      <Navbar />
      <ImgSlider />
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/infogrid" element={<InfoGrid />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
        <Route path="/rooms" element={<OurRooms />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
      </Suspense>
      <Footer />
    </Router>
  )
}

export default App
