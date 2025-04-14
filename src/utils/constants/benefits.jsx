import PublicIcon from '@mui/icons-material/Public';
import FlightIcon from '@mui/icons-material/Flight';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const benefits = [
  {
    icon: <PublicIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    title: 'Pengalaman Global',
    description: 'Dengan pengalaman lebih dari 10 tahun, kami telah melayani perjalanan lintas benua ke lebih dari 30 negara.',
  },
  {
    icon: <FlightIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    title: 'Paket Perjalanan yang Fleksibel',
    description: 'Kami menawarkan berbagai pilihan paket perjalanan yang dapat disesuaikan dengan kebutuhan Anda.',
  },
  {
    icon: <AttachMoneyIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    title: 'Harga Kompetitif',
    description: 'Kami menawarkan harga yang kompetitif tanpa mengorbankan kualitas layanan.',
  },
];

export default benefits;
