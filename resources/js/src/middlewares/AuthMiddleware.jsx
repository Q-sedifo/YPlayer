import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthMiddleware = ({ children }) => {
    const navigate = useNavigate()
    const { auth, authLoading } = useAuth()

    useEffect(() => {
        !authLoading && !auth && navigate('/welcome')
    }, [authLoading])

    return (
        <>
            {!authLoading && auth && children}
        </>
    )
}

export default AuthMiddleware;