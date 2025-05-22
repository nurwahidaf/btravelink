import { useNavigate } from 'react-router-dom';
import { Box, Fab } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// komponen untuk menampilkan tombol mengapung di pojok kanan bawah
const FloatButton = () => {
  const navigate = useNavigate();

  // fungsi untuk menangani klik tombol riwayat reservasi
  const handleClickReservations = () => {
    navigate('/reservations');
  }

  // fungsi untuk menangani klik tombol WhatsApp
  const handleClickWhatsApp = () => {
    window.open('https://api.whatsapp.com/send?phone=6281904006789', '_blank');
  }

  return (
    <Box>
      <Fab 
        aria-label='reservations'
        color='primary' 
        onClick={handleClickReservations}
        sx={{ position: 'fixed', bottom: 16, right: 80, mr: 2, mb: 2 }}
        >
        <HistoryIcon sx={{ color: 'white' }} />
      </Fab>
      <Fab 
        aria-label='contact-whatsapp'
        color='success' 
        onClick={handleClickWhatsApp}
        sx={{ position: 'fixed', bottom: 16, right: 16, mr: 2, mb: 2, backgroundColor: '#25D366', '&:hover': { backgroundColor: '#128C7E' } }}
      >
        <WhatsAppIcon />
      </Fab>
    </Box>
  );
};

export default FloatButton;
