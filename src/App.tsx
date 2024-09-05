import { lazy, Suspense, useContext, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Dashboard from './admin/dashboard';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import axios from 'axios';
import { Context } from './main';
const Home = lazy(() => import('./pages/Home'));
const Emails = lazy(() => import('./admin/emails'));
const Bookings = lazy(() => import('./admin/bookings'));
const Rooms = lazy(() => import('./admin/rooms'));
const Transactions = lazy(() => import('./admin/transactions'));
const SignIn = lazy(() => import('./admin/SignIn')); 
const SignUp = lazy(() => import('./admin/SignUp'));
const Loader = lazy(() => import("./components/Loader"));
const Settings = lazy(() => import("./admin/settings"));
const Staff = lazy(() => import("./admin/staff"));
function App() {
  const {setUser, setIsAuthenticated, isAuthenticated} = useContext(Context)
  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
      if(user){
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/staff/getSingle/${user.uid}`, { withCredentials: true});
        setUser(response.data.user);
        setIsAuthenticated(true);
      }else{
        setIsAuthenticated(false)
      }
    });
  }, [isAuthenticated])
    return (
    <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/admin' element={<SignIn />} />
            <Route path='/admin/signup' element={<SignUp />} />
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/mails' element={<Emails />} />
            <Route path='/admin/rooms' element={<Rooms />} />
            <Route path='/admin/transactions' element={<Transactions />} />
            <Route path='/admin/bookings' element={<Bookings />} />
            <Route path='/admin/settings' element={<Settings />} />
            <Route path='/admin/staff' element={<Staff />} />
          </Routes>
        </Suspense>
        <Toaster />
    </Router>
  );
}

export default App;
