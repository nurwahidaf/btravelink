import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';

const services = [
  {
    icon: <TravelExploreIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    title: 'Tour & Travel',
    description: 'Layanan perjalanan domestik dan internasional, termasuk open trip, perjalanan ibadah (Umroh, Haji, Ziarah), dan paket khusus sesuai permintaan.',
  },
  {
    icon: <DescriptionIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    title: 'Pengurusan Dokumen',
    description: 'Layanan lengkap untuk pengurusan dokumen perjalanan seperti paspor, visa, KITAS, dan layanan VIP di bandara.',
  },
  {
    icon: <EventIcon sx={{ fontSize: 50, color: 'primary.main' }} />,
    title: 'MICE',
    description: 'Penyelenggaraan berbagai kegiatan seperti seminar, workshop, pameran, staycation, outbound, hingga business matching untuk perusahaan dan organisasi.',
  },
];

export default services;
