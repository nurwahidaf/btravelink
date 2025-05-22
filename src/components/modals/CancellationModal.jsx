import { cancelReservation } from '../../firebase/firestore';
import { Box, Button, Typography } from '@mui/material';
import BaseModal from './BaseModal';
import CancelIcon from '@mui/icons-material/Cancel';

// komponen untuk menampilkan modal konfirmasi pembatalan reservasi
const CancellationModal = ({ open, reservationId, onReservationCanceled, onCloseCancellation }) => {
  const handleCancelReservation = async () => {
    if (!reservationId) return;

    try {
      await cancelReservation(reservationId);
      if (onReservationCanceled) onReservationCanceled(reservationId);
    } catch (error) {
      console.error('Error canceling reservation: ', error);
    } finally {
      onCloseCancellation();
    }
  }

  return (
    <BaseModal open={open} onCloseModal={onCloseCancellation}>
      <CancelIcon sx={{ fontSize: 50, color: '#FF5722', mb: 2 }} />
      <Typography id='transition-modal-title' variant='h6' component='h2'>
        Konfirmasi Pembatalan Reservasi
      </Typography>
      <Typography id='transition-modal-description' sx={{ mt: 2 }}>
        Apakah Anda ingin membatalkan reservasi ini?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 2 }}>
        <Button variant='outlined' color='error' onClick={handleCancelReservation}>
          Batalkan
        </Button>
        <Button variant='outlined' color='primary' onClick={onCloseCancellation}>
          Tutup
        </Button>
      </Box>
    </BaseModal>
  );
};

export default CancellationModal;
