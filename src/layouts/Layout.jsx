import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatButton from "../components/buttons/FloatButton";

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
