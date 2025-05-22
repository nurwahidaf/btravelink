import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase/auth';
import { saveUser } from '../firebase/firestore';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

// komponen untuk menampilkan form login
const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // fungsi untuk menangani login dengan Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      login(result.user); // simpan user ke context
      saveUser(result.user); // simpan user ke Firestore

      // redirect ke halaman sebelumnya
      const from = location.state?.from?.pathname || '/';
      const formState = location.state?.from?.state;
      navigate(from, { replace: true, state: formState });
    } catch (error) {
      console.error('Google Login Error:', error);
    }
  };

  return (
    <Button
      variant='outlined'
      color='primary'
      fullWidth
      onClick={handleGoogleLogin}
      sx={{ mt: 2 }}
    >
      <GoogleIcon sx={{ mr: 1 }} />
      Login with Google
    </Button>
  );
};

export default AuthForm;
