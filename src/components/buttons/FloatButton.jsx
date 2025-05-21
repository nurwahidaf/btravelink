import { Box, Fab } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate } from "react-router-dom";

const FloatButton = () => {
  const navigate = useNavigate();
  const handleClickReservations = () => {
    navigate('/reservations');
  }
  const handleClickWhatsApp = () => {
    // Handle the click event for the WhatsApp button
    window.open('https://api.whatsapp.com/send?phone=6281904006789', '_blank');
  }

  return (
    <Box>
      <Fab 
        color="primary" 
        aria-label="reservations"
        onClick={handleClickReservations}
        sx={{ position: 'fixed', bottom: 16, right: 80, marginRight: 2, marginBottom: 2 }}
        >
        <HistoryIcon sx={{ color: 'white' }} />
      </Fab>
      <Fab 
        color="success" 
        aria-label="contact-whatsapp"
        onClick={handleClickWhatsApp}
        sx={{ position: 'fixed', bottom: 16, right: 16, marginRight: 2, marginBottom: 2, backgroundColor: '#25D366', '&:hover': { backgroundColor: '#128C7E' } }}
      >
        <WhatsAppIcon />
      </Fab>
    </Box>
  );
};

export default FloatButton;