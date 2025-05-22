import { useLocation } from 'react-router-dom';
import ReservationForm from '../components/ReservationForm';

// komponen untuk menampilkan halaman reservasi
const Reservation = () => {
  // mengambil data dari state yang dikirim dari halaman detail paket
  const location = useLocation();
  const { packageName, departureDate, packagePrice } = location.state || {};
  
  return (
    <ReservationForm 
      packageName={packageName}
      departureDate={departureDate}
      packagePrice={packagePrice}
    />
  );
};

export default Reservation;
