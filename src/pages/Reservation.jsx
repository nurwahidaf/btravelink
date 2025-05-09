import { useLocation } from "react-router-dom";
import ReservationForm from "../components/ReservationForm";

const Reservation = () => {
  const location = useLocation();
  const { packageName, departureDate, packagePrice } = location.state || {};
  return (
    <>
      <ReservationForm 
        packageName={packageName}
        departureDate={departureDate}
        packagePrice={packagePrice}
      />
    </>
  );
}

export default Reservation;
