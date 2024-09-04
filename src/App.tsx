import { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Dashboard from './admin/dashboard';
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
