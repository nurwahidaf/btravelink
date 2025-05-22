import { Box, Typography } from '@mui/material';

// komponen untuk menampilkan informasi perusahaan dalam bentuk kartu
const InfoCard = ({ data }) => {
  // destructuring data dari props
  const { icon, title, description, bank, name, accountNumber } = data;

  return (
    <Box sx={{ width: { xs: '80%', sm: '50%', md: '20%' }, flexGrow: 1, m: 2 }}>
      {icon}
      <Box>
        <Typography
          variant='h5'
          color='text.dark'
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            mb: 1
          }}
        >
          {title || bank}
        </Typography>
        <Typography
          variant='body2'
          color='text.dark'
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem' }            
          }}
        >
          {description}
        </Typography>
        {name && (
          <Typography
            variant='body2'
            color='text.dark'
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' }            
            }}
          >
            a.n. {name}
          </Typography>
        )}
        {accountNumber && (
          <Typography
            variant='body2'
            color='text.dark'
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem' }            
            }}
          >
            {accountNumber}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default InfoCard;
