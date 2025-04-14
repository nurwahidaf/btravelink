import { Box, Typography } from "@mui/material";

const InfoCard = ({ data }) => {
  const { icon, title, description } = data;

  return (
    <>
      <Box sx={{ width: { xs: '80%', sm: '50%', md: '20%' }, flexGrow: 1, m: 2 }}>
        {icon}
        <Box>
          <Typography
            variant="h5"
            color="text.dark"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              mb: 1
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.dark"
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' }            
            }}
          >
            {description}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default InfoCard;
