import { collection, doc, runTransaction, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./db";

const saveUser = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const userData = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    createdAt: serverTimestamp(),
  };

  try {
    await setDoc(userRef, userData);
    console.log('photoURL', user.photoURL);
  } catch (error) {
    console.error("Error saving user to Firestore:", error);
  }
};

// fungsi untuk menyimpan data reservasi ke firestore
const saveReservation = async (reservationData) => {
  const packageRef = doc(db, 'tour-packages', reservationData.packageId);
  const reservationRef = doc(collection(db, 'reservations'));

  try {
    await runTransaction(db, async (transaction) => {
      console.log('mulai transaksi');
      const packageDoc = await transaction.get(packageRef); // mendapatkan dokumen paket perjalanan berdasarkan ID
      
      // cek apakah dokumen paket perjalanan ada
      if (!packageDoc.exists()) {
        throw new Error('Tour package does not exist');
      }
      
      const data = packageDoc.data(); // mendapatkan data dari dokumen paket perjalanan
      const seats = data.availableSeats; // mendapatkan jumlah kursi yang tersedia
      console.log('seats', seats);
      // cek apakah kursi tersedia
      if (seats <= 0) {
        throw new Error('No available seats for this package');
      }
      
      // mengurangi jumlah kursi yang tersedia
      transaction.update(packageRef, { availableSeats: seats - 1 });
      console.log('kurang kursi', seats - 1);
      // menyimpan data reservasi ke dalam koleksi 'reservations'
      transaction.set(reservationRef, {
        ...reservationData,
        status: 'Dikonfirmasi',
        createdAt: serverTimestamp(),
      });
      console.log('menambahkan data reservasi');
    });
  } catch (error) {
    console.error('Error saving reservation: ', error);
  }
};

// fungsi pembatalkan reservasi
const cancelReservation = async (reservationId) => {
  const reservationRef = doc(db, "reservations", reservationId);
  
  try {
    await runTransaction(db, async (transaction) => {
      const reservationDoc = await transaction.get(reservationRef); // mendapatkan dokumen reservasi berdasarkan ID
      
      // cek apakah dokumen reservasi ada
      if (!reservationDoc.exists()) {
        throw new Error('Reservation does not exist');
      }
      
      const reservationData = reservationDoc.data();

      // cek apakah reservasi sudah dibatalkan untuk menghindari pembatalan ganda
      if (reservationData.status === 'Dibatalkan') {
        throw new Error('Reservation is already canceled');
      }

      const packageRef = doc(db, 'tour-packages', reservationData.packageId); // mendapatkan referensi paket perjalanan berdasarkan ID
      const packageDoc = await transaction.get(packageRef); // mendapatkan dokumen paket perjalanan berdasarkan ID

      if (!packageDoc.exists()) {
        throw new Error('Tour package does not exist');
      }

      const seats = packageDoc.data().availableSeats; // mendapatkan jumlah kursi yang tersedia

      // mengembalikan jumlah kursi yang tersedia
      transaction.update(packageRef, { availableSeats: seats + 1 });
      console.log('tambah kursi', seats + 1);
      // memperbarui status reservasi menjadi 'Dibatalkan'
      transaction.update(reservationRef, { status: 'Dibatalkan' });
      console.log('pembatalan reservasi berhasil');
    });
  } catch (error) {
    console.error('Error canceling reservation: ', error);
  }
};

export { saveUser, saveReservation, cancelReservation };
