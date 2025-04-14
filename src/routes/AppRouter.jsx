import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Packages from "../pages/Packages";
import Package from "../pages/Package";
import Reservation from "../pages/Reservation";
import Reservations from "../pages/Reservations";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Layout from "../layouts/Layout";
import AuthLayout from "../layouts/AuthLayout";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:packageId" element={<Package />} />
        <Route path="/packages/:packageId/reservation" element={<Reservation />} />
        <Route path="/reservations" element={<Reservations />} />
      </Route>
      <Route element={<AuthLayout />} >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
