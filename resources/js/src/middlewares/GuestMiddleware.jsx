import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const GuestMiddleware = ({ children }) => {
    const navigate = useNavigate()
    const { auth, authLoading } = useAuth()

    useEffect(() => {
        !authLoading && auth && navigate('/')
    }, [authLoading])

    return (
        <>
            {!authLoading && !auth && children}
        </>
    )
}

export default GuestMiddleware;