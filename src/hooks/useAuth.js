import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Custom hook untuk menggunakan AuthContext
const useAuth = () => useContext(AuthContext);

export { useAuth };
