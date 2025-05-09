import { Backdrop, Box, Fade, Modal } from "@mui/material";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 20,
  p: { xs: 2, sm: 3, md: 4},
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const BaseModal = ({  open, onCloseModal, children }) => {
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          {children}
        </Box>
      </Fade>
    </Modal>
  )
};

export default BaseModal;