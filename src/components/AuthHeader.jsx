import { Typography } from "@mui/material";

const AuthHeader = ({ textAuthTitle, textAuthSubtitle}) => {
  return (
    <>
      <Typography
        variant="h4"
        color='primary'
        gutterBottom
        sx={{ 
          fontSize: {
            xs: "2rem",
            sm: "2.2rem",
            md: "2.5rem",
          },
          fontWeight: "bold",
          textAlign: "left",
          whiteSpace: "pre-line",
          }}
      >
        {textAuthTitle}
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ 
          fontSize: {
            xs: "1.2rem",
            sm: "1.3rem",
            md: "1.4rem",
          },
          textAlign: "left",
          }}
      >
        {textAuthSubtitle}
      </Typography>
    </>
  );
};

export default AuthHeader;
