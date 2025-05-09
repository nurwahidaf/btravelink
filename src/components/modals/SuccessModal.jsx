import { CheckCircle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import BaseModal from "./BaseModal";

const SuccessModal = ({ open, onCloseModal }) => {
  const { packageId } = useParams();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    onCloseModal();
    navigate(`/packages/${packageId}`);
  };

  return (
    <>
      <BaseModal open={open} onCloseModal={handleCloseModal}>
        <CheckCircle sx={{ fontSize: 50, color: '#4CAF50', mb: 2 }} />
        <Typography id="transition-modal-title" variant="h6" component="h2">
          Reservasi Anda Berhasil!
        </Typography>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          Terima kasih telah melakukan reservasi. Silakan cek halaman riwayat reservasi untuk detail lebih lanjut.
        </Typography>
      </BaseModal>
    </>
  );
};

export default SuccessModal;
