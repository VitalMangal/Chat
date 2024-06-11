import { useContext } from 'react';
import authContext from '../context/AuthContext';
import DataContext from '../context/DataContext';

const useAuth = () => useContext(authContext);
const useData = () => useContext(DataContext);

export { useAuth, useData };
