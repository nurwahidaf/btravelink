import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FloatButton from '../components/buttons/FloatButton';
import Footer from '../components/Footer';

// komponent Layout untuk membungkus semua halaman
const Layout = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Outlet />
        <FloatButton />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
