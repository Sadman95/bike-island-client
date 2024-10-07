import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth-provider';

const useAuth = () =>useContext(AuthContext);

export default useAuth;