import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Dashboard from './admin/dashboard';

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
            <Route path='/admin/dashboard' element={<Dashboard />} />
          </Routes>
        </Suspense>
       
        <Toaster />
    </Router>
  );
}



export default App;
