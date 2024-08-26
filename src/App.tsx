import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';

// const Navbar = lazy(() => import("./components/Navbar"));

const Home = lazy(() => import('./pages/Home'));

const Loader = lazy(() => import("./components/Loader"));


function App() {
  

  return (
    <Router>
     
        {/* <Navbar  onScrollToContact={handleScrollToContact}/> */}
        {/* <ImgSlider />
        <InfoGrid />
        <GotoTopButton /> */}
        <Suspense fallback={<Loader />}>
        
          <Routes>
            <Route path="/" element={<Home />} />
        
          </Routes>
        </Suspense>
       
        <Toaster />
    </Router>
  );
}



export default App;
