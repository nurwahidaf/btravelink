import { Box, Button, Typography } from "@mui/material";
import BaseModal from "./BaseModal";
import CancelIcon from '@mui/icons-material/Cancel';
import { cancelReservation } from "../../firebase/firestore";

const CancellationModal = ({ open, reservationId, onReservationCanceled, onCloseCancellation }) => {
  const handleCancelReservation = async () => {
    if (!reservationId) return;

    try {
      await cancelReservation(reservationId);
      if (onReservationCanceled) onReservationCanceled(reservationId);
    } catch (error) {
      console.error("Error canceling reservation: ", error);
    } finally {
      onCloseCancellation();
    }
  }
  return (
    <>
      <BaseModal open={open} onCloseModal={onCloseCancellation}>
        <CancelIcon sx={{ fontSize: 50, color: '#FF5722', mb: 2 }} />
        <Typography id="transition-modal-title" variant="h6" component="h2">
          Konfirmasi Pembatalan Reservasi
        </Typography>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Apakah Anda ingin membatalkan reservasi ini?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 2 }}>
          <Button onClick={handleCancelReservation} variant="outlined" color="error">
            Batalkan
          </Button>
          <Button onClick={onCloseCancellation} variant="outlined" color="primary">
            Tutup
          </Button>
        </Box>
      </BaseModal>
    </>
  )
};

export default CancellationModal;
