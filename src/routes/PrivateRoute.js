import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider'
import Spin from '../shared/Spinner/Spin';

export default function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) return <Spin />
    if (!user?.email) return <Navigate to='/login' state={{ from: location }} replace />
    return (
        children
    )
}
