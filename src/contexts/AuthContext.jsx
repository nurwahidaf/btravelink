import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/auth";

// Kelola state autentikasi dengan Context API dan Firebase Authentication
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // onAuthStateChanged untuk deteksi perubahan status autentikasi
  // dan memperbarui state user & loading
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (appUser) => {
      setUser(appUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fungsi untuk login dan logout user
  const login = (userData) => setUser(userData);

  const logout = () => {
    auth.signOut();
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children} {/* Render children setelah loading selesai */}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
