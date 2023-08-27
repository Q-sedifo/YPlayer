import React, { useState, useEffect } from 'react';
import NET from '../network';
import axios from 'axios';

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)
    const authStorage = 'auth'

    useEffect(() => {
        // Checking for authorization
        const user = JSON.parse(localStorage.getItem(authStorage))
        
        if (user) setAuth(user)
        setAuthLoading(false)
    }, [])

    const authenticate = (user) => {
        localStorage.setItem(authStorage, JSON.stringify(user))
        setAuth(user)
    }

    // const unauthenticate = () => {
    //     localStorage.removeItem(authStorage)
    //     setAuth(null)
    //     window.location.href = '/welcome'
    // }

    const logout = () => {
        authRequest(() => {
            axios.post(`${NET.APP_URL}/logout`)
                .then(res => {
                    localStorage.removeItem(authStorage)
                    setAuth(null)
                    window.location.href = '/welcome'
                })
                .catch(err => console.log(err))
        })
    }

    const authRequest = (callback) => {
        if (!auth) return

        if (auth && auth.access_token) axios.defaults.headers.common['Authorization'] = `Bearer ${auth.access_token}`

        // If user is invalid then unauthenticate
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 419 || error.response.status === 401) {
                    unauthenticate()
                }
                return Promise.reject(error);
            }
        )

        callback()
    }

    const value = { auth, authLoading, authenticate, logout, authRequest }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;