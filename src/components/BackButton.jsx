import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => navigate(-1)}
      sx={{ my: 1, ml: 1, }}
    >
      <ArrowBackIcon />
    </IconButton>
  )
}

export default BackButton;
