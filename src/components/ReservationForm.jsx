import { useEffect, useState } from 'react';
import { useAuth } from './../hooks/useAuth';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { saveReservation } from './../firebase/firestore';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import BackButton from './buttons/BackButton';
import SuccessModal from './modals/SuccessModal';

// komponen untuk menampilkan form reservasi
const ReservationForm = ({ packageName, departureDate, packagePrice }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageId } = useParams(); // mengambil packageId dari URL
  const { user } = useAuth(); // ambil user dari context useAuth
  
  // jika user belum login, arahkan ke halaman auth
  // simpan state untuk kembali ke halaman form setelah login
  useEffect(() => {
    if (!user) {
      navigate('/auth', {
        state: {
          from: {
            pathname: location.pathname,
            state: { packageName, departureDate, packagePrice }
          }
        }
      });
    }
  }, [user, navigate, location.pathname, packageName, departureDate, packagePrice]);

  const [dateOfBirth, setDateOfBirth] = useState(null); // state untuk menyimpan tanggal lahir
  const [passportExpiryDate, setPassportExpiryDate] = useState(null); // state untuk menyimpan tanggal kadaluwarsa paspor
  const priceNumber = parseInt(packagePrice.replace(/[^\d]/g, ''), 10); // mengambil harga paket dari props dan parsing menjadi angka
  
  const [error, setError] = useState({}); // state untuk menangani error
  const [openSuccessModal, setOpenSuccessModal] = useState(false); // state untuk menangani modal sukses
  const [isSubmitting, setIsSubmitting] = useState(false); // state untuk menangani status pengiriman
  
  // initial input form
  const initialInputForm = {
    email: user?.email || '',
    fullName: '',
    identityNumber: '',
    passportNumber: '',
    contactNumber: '',
    additionalNotes: '',
  }

  const [inputData, setInputData] = useState(initialInputForm); // state untuk menyimpan data yang diinput
  
  // fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: name === 'passportNumber' ? value.toUpperCase() : value,
    }));
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // validasi input form
    const validationErrors = {};
    if (!inputData.email.trim()) {
      validationErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputData.email)) {
      validationErrors.email = 'Format email tidak valid';
    }
    if (!inputData.fullName.trim()) { 
      validationErrors.fullName = 'Nama lengkap wajib diisi';
    }
    if (!/^\d{16}$/.test(inputData.identityNumber)) {
      validationErrors.identityNumber = 'Nomor identitas harus terdiri dari 16 digit angka';
    }
    if (!dateOfBirth) {
      validationErrors.dateOfBirth = 'Tanggal lahir wajib diisi';
    }
    if (!/^[a-zA-Z0-9]{7,12}$/.test(inputData.passportNumber)) {
      validationErrors.passportNumber = 'Nomor paspor harus terdiri dari 7 hingga 12 karakter';
    }
    if (!passportExpiryDate) {
      validationErrors.passportExpiryDate = 'Tanggal kedaluwarsa paspor wajib diisi';
    }
    if (!/^\d{10,15}$/.test(inputData.contactNumber)) {
      validationErrors.contactNumber = 'Nomor kontak harus berupa angka dan terdiri dari 10 hingga 15 digit';
    }
    
    setError(validationErrors);
    
    // menghentikan proses submit jika ada error
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
    // data yang akan dikirim ke server
    const reservationData = {
      ...inputData,
      userId: user.uid,
      packageId,
      packageName,
      departureDate,
      packagePrice: priceNumber,
      dateOfBirth: dateOfBirth ? dayjs(dateOfBirth).format('YYYY-MM-DD') : null,
      passportExpiryDate: passportExpiryDate ? dayjs(passportExpiryDate).format('YYYY-MM-DD') : null,
    };
    
    // kirim data ke server
    setIsSubmitting(true);
    await saveReservation(reservationData);

    // tampilkan modal sukses
    setTimeout(() => {
      setIsSubmitting(false);
      setOpenSuccessModal(true);
    }, 500);

    // reset form setelah submit
    setInputData(initialInputForm);
    setDateOfBirth(null);
    setPassportExpiryDate(null);
    setError({});
  }
  
  return (
    <>
      <Box sx={{ px: 4 }}>
        <BackButton />
        <Box 
          component='form' 
          onSubmit={handleSubmit}
          sx={{ 
            width: { xs: '90%', sm: '65%', md: '40%' }, 
            mx: 'auto',
            display: 'flex', flexDirection: 'column', gap: 1,
            fontWeight: 'bold' 
          }}
        >
          <Typography variant='h5' gutterBottom sx={{ fontWeight: 'bold' }}>
            Formulir Reservasi
          </Typography>
          <Typography variant='body1' gutterBottom>
            Silakan isi detail di bawah ini untuk melakukan reservasi. Kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi.
          </Typography>
          <TextField
            id='packageName'
            name='packageName'
            label='Nama Paket Perjalanan'
            value={packageName}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
            margin='normal'
            size='small'
          />
          <TextField
            id='departureDate'
            name='departureDate'
            label='Tanggal Keberangkatan'
            value={departureDate}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
            margin='normal'
            size='small'
          />
          <FormControl fullWidth margin='normal' size='small'>
            <InputLabel htmlFor='packagePrice'>Harga Paket</InputLabel>
            <OutlinedInput
              id='packagePrice'
              name='packagePrice'
              label='Harga Paket'
              value={packagePrice}
              readOnly
              startAdornment={<InputAdornment position='start'>Rp</InputAdornment>}
            />
          </FormControl>
          <TextField
            id='email'
            name='email'
            label='Email'
            type='email'
            autoComplete='email'
            onChange={handleChange}
            value={inputData.email}
            error={!!error.email}
            helperText={error.email}
            required
            fullWidth
            margin='normal'
            size='small'
          />
          <TextField
            id='fullName'
            name='fullName'
            label='Nama Lengkap (sesuai dengan paspor)'
            type='text'
            onChange={handleChange}
            value={inputData.fullName}
            error={!!error.fullName}
            helperText={error.fullName}
            required
            fullWidth
            margin='normal'
            size='small'
          />
          <TextField
            id='identityNumber'
            name='identityNumber'
            label='Nomor Identitas (KTP/NIK)'
            type='tel'
            slotProps={{
              input: {
                maxLength: 16,
              },
            }}
            onChange={handleChange}
            value={inputData.identityNumber}
            error={!!error.identityNumber}
            helperText={error.identityNumber}
            required
            fullWidth
            margin='normal'
            size='small'
          />
          <DatePicker
            label='Tanggal Lahir'
            onChange={(newValue) => setDateOfBirth(newValue)}
            value={dateOfBirth}
            disableFuture={true}
            slotProps={{
              textField: {
                id: 'dateOfBirth',
                name: 'dateOfBirth',
                variant: 'outlined',
                helperText: error.dateOfBirth,
                error: !!error.dateOfBirth,
                required: true,
                fullWidth: true,
                margin: 'normal',
                size: 'small'
              }
            }}
          />
          <TextField
            id='passportNumber'
            name='passportNumber'
            label='Nomor Paspor'
            type='text'
            onChange={handleChange}
            value={inputData.passportNumber}
            error={!!error.passportNumber}
            helperText={error.passportNumber}
            required
            fullWidth
            margin='normal'
            size='small'
          />
          <DatePicker
            label='Tanggal Kadaluarsa Paspor'
            onChange={(newValue) => setPassportExpiryDate(newValue)}
            value={passportExpiryDate}
            disablePast={true}
            slotProps={{
              textField: {
                id: 'passportExpiryDate',
                name: 'passportExpiryDate',
                variant: 'outlined',
                error: !!error.passportExpiryDate,
                helperText: error.passportExpiryDate,
                required: true,
                fullWidth: true,
                margin: 'normal',
                size: 'small'
              }
            }}
          />
          <TextField
            id='contactNumber'
            name='contactNumber'
            label='Nomor Kontak (WhatsApp)'
            type='tel'
            onChange={handleChange}
            value={inputData.contactNumber}
            error={!!error.contactNumber}
            helperText={error.contactNumber}
            fullWidth
            required
            margin='normal'
            size='small'
          />
          <TextField
            id='additionalNotes'
            name='additionalNotes'
            label='Catatan Tambahan'
            type='text'
            onChange={handleChange}
            value={inputData.additionalNotes}
            fullWidth
            multiline
            rows={4}
            margin='normal'
            size='small'
          />
          <Button
            variant='contained'
            color='primary'
            type='submit'
            disabled={isSubmitting}
            fullWidth
            sx={{ mt: 2 }}
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Reservasi'}
          </Button>
        </Box>
      </Box>

      <SuccessModal 
        open={openSuccessModal}
        onCloseModal={() => setOpenSuccessModal(false)}
      />
    </>
  );
};

export default ReservationForm;
