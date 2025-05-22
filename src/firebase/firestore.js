import { collection, doc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './db';

// fungsi untuk menyimpan data pengguna ke firestore
const saveUser = async (user) => {
  // referensi ke dokumen pengguna berdasarkan uid
  const userRef = doc(db, 'users', user.uid);

  // data pengguna yang akan disimpan
  const userData = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    createdAt: serverTimestamp(),
  };

  try {
    await setDoc(userRef, userData); // menyimpan dokumen ke koleksi 'users' dengan uid sebagai id dokumen
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
  }
};

// fungsi untuk menyimpan data reservasi ke firestore
const saveReservation = async (reservationData) => {
  // referensi ke dokumen paket perjalanan berdasarkan packageId
  const packageRef = doc(db, 'tour-packages', reservationData.packageId);
  
  // referensi ke dokumen reservasi baru (id otomatis dari firestore)
  const reservationRef = doc(collection(db, 'reservations'));

  try {
    await runTransaction(db, async (transaction) => {
      const packageDoc = await transaction.get(packageRef); // mendapatkan dokumen paket
      
      // cek apakah dokumen paket perjalanan ada
      if (!packageDoc.exists()) {
        throw new Error('Tour package does not exist');
      }
      
      const data = packageDoc.data(); // mendapatkan data dari dokumen paket perjalanan
      const seats = data.availableSeats; // mendapatkan jumlah kursi yang tersedia
      
      // cek apakah kursi tersedia
      if (seats <= 0) {
        throw new Error('No available seats for this package');
      }
      
      // mengurangi jumlah kursi yang tersedia
      transaction.update(packageRef, { availableSeats: seats - 1 });
      
      // menyimpan data reservasi ke dalam koleksi 'reservations'
      transaction.set(reservationRef, {
        ...reservationData,
        status: 'Dikonfirmasi', // status awal reservasi
        createdAt: serverTimestamp(), // waktu pembuatan reservasi
      });
    });
  } catch (error) {
    console.error('Error saving reservation: ', error);
  }
};

// fungsi pembatalan reservasi
const cancelReservation = async (reservationId) => {
  // referensi ke dokumen reservasi berdasarkan reservationId
  const reservationRef = doc(db, 'reservations', reservationId);
  
  try {
    await runTransaction(db, async (transaction) => {
      const reservationDoc = await transaction.get(reservationRef);  // mendapatkan dokumen reservasi
      
      // cek apakah dokumen reservasi ada
      if (!reservationDoc.exists()) {
        throw new Error('Reservation does not exist');
      }
      
      const reservationData = reservationDoc.data();

      // cek apakah reservasi sudah dibatalkan untuk menghindari pembatalan ganda
      if (reservationData.status === 'Dibatalkan') {
        throw new Error('Reservation is already canceled');
      }

      const packageRef = doc(db, 'tour-packages', reservationData.packageId); // mendapatkan referensi paket perjalanan berdasarkan id
      const packageDoc = await transaction.get(packageRef); // mendapatkan dokumen paket perjalanan berdasarkan id
      
      // cek apakah dokumen paket perjalanan ada
      if (!packageDoc.exists()) {
        throw new Error('Tour package does not exist');
      }

      const seats = packageDoc.data().availableSeats; // mendapatkan jumlah kursi yang tersedia
      transaction.update(packageRef, { availableSeats: seats + 1 }); // mengembalikan jumlah kursi yang tersedia
      transaction.update(reservationRef, { status: 'Dibatalkan' }); // memperbarui status reservasi menjadi 'Dibatalkan'
    });
  } catch (error) {
    console.error('Error canceling reservation: ', error);
  }
};

export { saveUser, saveReservation, cancelReservation };
