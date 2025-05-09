import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useAuth } from './../hooks/useAuth';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SuccessModal from "./modals/SuccessModal";
import { saveReservation } from "./../firebase/firestore";
import BackButton from "./BackButton";

const ReservationForm = ({ packageName, departureDate, packagePrice }) => {
  // State untuk menyimpan tanggal lahir
  const [dateOfBirth, setDateOfBirth] = useState(null);
  // State untuk menyimpan tanggal kadaluarsa paspor
  const [passportExpiryDate, setPassportExpiryDate] = useState(null);
  //  State untuk menangani error
  const [error, setError] = useState({});
  const priceNumber = parseInt(packagePrice.replace(/[^\d]/g, ""), 10);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { packageId } = useParams();
  
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

  // Initial input form
  const initialInputForm = {
    email: "",
    fullName: "",
    identityNumber: "",
    passportNumber: "",
    contactNumber: "",
    additionalNotes: "",
  }
  // State untuk menyimpan data yang diinput
  const [inputData, setInputData] = useState(initialInputForm);
  
  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: name === 'passportNumber' ? value.toUpperCase() : value,
    }));
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi input
    const validationErrors = {};
    if (!inputData.email.trim()) {
      validationErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputData.email)) {
      validationErrors.email = "Format email tidak valid";
    }
    if (!inputData.fullName.trim()) { 
      validationErrors.fullName = "Nama lengkap wajib diisi";
    }
    if (!/^\d{16}$/.test(inputData.identityNumber)) {
      validationErrors.identityNumber = "Nomor identitas harus terdiri dari 16 digit";
    }
    if (!dateOfBirth) {
      validationErrors.dateOfBirth = "Tanggal lahir wajib diisi";
    }
    if (!/^[a-zA-Z0-9]{7,12}$/.test(inputData.passportNumber)) {
      validationErrors.passportNumber = "Nomor paspor harus terdiri dari 7 hingga 12 karakter";
    }
    if (!passportExpiryDate) {
      validationErrors.passportExpiryDate = "Tanggal kedaluwarsa paspor wajib diisi";
    }
    if (!/^\d{10,15}$/.test(inputData.contactNumber)) {
      validationErrors.contactNumber = "Nomor kontak harus terdiri dari 10 hingga 15 digit";
    }
    
    setError(validationErrors);
    
    // Menghentikan proses submit jika ada error
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
    // Data yang akan dikirim ke server
    const reservationData = {
      ...inputData,
      userId: user.uid,
      packageId,
      packageName,
      departureDate,
      packagePrice: priceNumber,
      dateOfBirth: dateOfBirth ? dayjs(dateOfBirth).format("YYYY-MM-DD") : null,
      passportExpiryDate: passportExpiryDate ? dayjs(passportExpiryDate).format("YYYY-MM-DD") : null,
    };
    
    // Kirim data ke server
    await saveReservation(reservationData);
    console.log("Form Data Submitted:", reservationData);
    setIsSubmitting(true);

    // Tampilkan modal sukses
    setTimeout(() => {
      setIsSubmitting(false);
      setOpenSuccessModal(true);
    }, 500);

    // Reset form setelah submit
    setInputData(initialInputForm);
    setDateOfBirth(null);
    setPassportExpiryDate(null);
    setError({});
  }
  
  // State untuk menangani modal
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  // State untuk menangani status pengiriman
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  return (
    <>
      <Box sx={{ px: 4 }}>
        <BackButton />
        <Box 
          component="form" 
          sx={{ 
            width: { xs: '90%', sm: '65%', md: '40%' }, 
            mx: 'auto',
            display: 'flex', flexDirection: 'column', gap: 1,
            fontWeight: 'bold' 
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Formulir Reservasi
          </Typography>
          <Typography variant="body1" gutterBottom>
            Silakan isi detail di bawah ini untuk melakukan reservasi. Kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi.
          </Typography>
          <TextField
            id="packageName"
            name="packageName"
            label="Nama Paket Perjalanan"
            value={packageName}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
            margin="normal"
            size="small"
          />
          <TextField
            id="departureDate"
            name="departureDate"
            label="Tanggal Keberangkatan"
            value={departureDate}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
            margin="normal"
            size="small"
          />
          <FormControl fullWidth margin="normal" size="small">
            <InputLabel htmlFor="packagePrice">Harga Paket</InputLabel>
            <OutlinedInput
              id="packagePrice"
              name="packagePrice"
              label="Harga Paket"
              value={packagePrice}
              readOnly
              startAdornment={<InputAdornment position="start">Rp</InputAdornment>}
            />
          </FormControl>
          <TextField
            id='email'
            name='email'
            label='Email'
            type='email'
            autoComplete='email'
            value={inputData.email}
            onChange={handleChange}
            error={!!error.email}
            helperText={error.email}
            fullWidth
            required
            margin="normal"
            size="small"
          />
          <TextField
            id='fullName'
            name='fullName'
            label='Nama Lengkap (sesuai dengan paspor)'
            type='text'
            value={inputData.fullName}
            onChange={handleChange}
            error={!!error.fullName}
            helperText={error.fullName}
            fullWidth
            required
            margin="normal"
            size="small"
          />
          <TextField
            id='identityNumber'
            name='identityNumber'
            label='Nomor Identitas (KTP/NIK)'
            type='text'
            slotProps={{
              input: {
                maxLength: 16,
              },
            }}
            value={inputData.identityNumber}
            onChange={handleChange}
            error={!!error.identityNumber}
            helperText={error.identityNumber}
            fullWidth
            required
            margin="normal"
            size="small"
          />
          <DatePicker
            label="Tanggal Lahir"
            value={dateOfBirth}
            onChange={(newValue) => setDateOfBirth(newValue)}
            disableFuture={true}
            slotProps={{
              textField: {
                id: 'dateOfBirth',
                name: 'dateOfBirth',
                variant: 'outlined',
                fullWidth: true,
                required: true,
                margin: 'normal',
                size: 'small',
                error: !!error.dateOfBirth,
                helperText: error.dateOfBirth
              }
            }}
          />
          <TextField
            id='passportNumber'
            name='passportNumber'
            label='Nomor Paspor'
            type='text'
            value={inputData.passportNumber}
            onChange={handleChange}
            error={!!error.passportNumber}
            helperText={error.passportNumber}
            fullWidth
            required
            margin="normal"
            size="small"
          />
          <DatePicker
            label="Tanggal Kadaluarsa Paspor"
            value={passportExpiryDate}
            onChange={(newValue) => setPassportExpiryDate(newValue)}
            disablePast={true}
            slotProps={{
              textField: {
                id: 'passportExpiryDate',
                name: 'passportExpiryDate',
                variant: 'outlined',
                fullWidth: true,
                required: true,
                margin: 'normal',
                size: 'small',
                error: !!error.passportExpiryDate,
                helperText: error.passportExpiryDate
              }
            }}
          />
          <TextField
            id="contactNumber"
            name="contactNumber"
            label="Nomor Kontak (WhatsApp)"
            type="tel"
            value={inputData.contactNumber}
            onChange={handleChange}
            error={!!error.contactNumber}
            helperText={error.contactNumber}
            fullWidth
            required
            margin="normal"
            size="small"
          />
          <TextField
            id="additionalNotes"
            name="additionalNotes"
            label="Catatan Tambahan"
            type="text"
            value={inputData.additionalNotes}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            size="small"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Mengirim..." : "Kirim Reservasi"}
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
