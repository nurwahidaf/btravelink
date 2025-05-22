import { useAuth } from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

// komponen untuk memastikan user sudah login sebelum mengakses route tertentu
const PrivateRoute = ({ children }) => {
  // ambil user dari context auth
  const { user } = useAuth();
  // ambil lokasi saat ini untuk redirect setelah login
  const location = useLocation();

  // jika user belum login, redirect ke halaman login
  if (!user) {
    return <Navigate to='/auth' state={{ from: location }} replace />;
  }

  // jika user sudah login, tampilkan children (halaman yang aksesnya dibatasi)
  return children;
};

export default PrivateRoute;
