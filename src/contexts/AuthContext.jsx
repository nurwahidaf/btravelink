import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/auth';

// context untuk kelola autentikasi pengguna
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // state untuk menyimpan data pengguna dan status loading
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // onAuthStateChanged untuk deteksi perubahan status autentikasi
  // dan memperbarui state user & loading
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (appUser) => {
      setUser(appUser); // set user ke state
      setLoading(false); // set loading ke false setelah mendapatkan status autentikasi
    });

    // unsubscribe dari listener saat komponen unmount supaya tidak ada memory leak
    return () => unsubscribe();
  }, []);

  // fungsi untuk login user
  const login = (userData) => setUser(userData);

  // fungsi untuk logout user
  const logout = () => {
    auth.signOut();
    setUser(null); // set user ke null saat logout
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children} {/* render children setelah loading selesai */}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
