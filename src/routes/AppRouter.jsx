import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './../layouts/Layout';
import Home from './../pages/Home';
import Packages from './../pages/Packages';
import Package from './../pages/Package';
import PrivateRoute from './PrivateRoute';
import Reservation from './../pages/Reservation';
import Reservations from './../pages/Reservations';
import Auth from './../pages/Auth';

// routing untuk aplikasi
const AppRouter = () => {
  // mendapatkan lokasi saat ini
  const location = useLocation();

  // scroll ke atas saat berpindah halaman
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='/packages' element={<Packages />} />
        <Route path='/packages/:packageId' element={<Package />} />
        <Route path='/packages/:packageId/reservation' element={
          <PrivateRoute>
            <Reservation />
          </PrivateRoute>
        } />
        <Route path='/reservations' element={
          <PrivateRoute>
            <Reservations />
          </PrivateRoute>
        } />
      </Route>
      <Route path='/auth' element={<Auth />} />
    </Routes>
  );
};

export default AppRouter;
