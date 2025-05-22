import { Box, Link, Typography } from '@mui/material';

// komponen untuk menampilkan footer
const Footer = () => {
  return (
    <Box
      sx={{
        color: 'white',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <Typography variant='body1' color='textSecondary' align='center'>
        &copy; {new Date().getFullYear()} PT Panna Erbe Naraya. All rights reserved.
      </Typography>
      <Typography variant='body2' color='textSecondary' align='center'>
        Ikuti kami di media sosial <br />
        <Link href='https://web.facebook.com/people/BTraveLink/100063771301487/?_rdc=1&_rdr#' color='inherit'> Facebook</Link> | 
        <Link href='https://www.tiktok.com/@btravelink' color='inherit'> TikTok</Link> | 
        <Link href='https://www.instagram.com/btravelink/#' color='inherit'> Instagram</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
